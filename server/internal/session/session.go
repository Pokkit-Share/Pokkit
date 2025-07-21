package session

import (
	"crypto/rand"
	"crypto/sha256"
	"crypto/subtle"
	"errors"
	"strings"
	"time"
)

const sessionExpiriresInSeconds = 24 * 60 * 60 // 24 hours

type SessionStore interface {
	CreateSession(session *Session) error
	GetSession(sessionID string) (Session, error)
	DeleteSession(sessionID string) error
}

type SessionManager struct {
	store SessionStore
}

type Session struct {
	id         string
	secretHash [32]byte
	createdAt  time.Time
}

type SessionWithToken struct {
	Session
	Token string
}

func (sm *SessionManager) CreateSession() *SessionWithToken {
	currentTime := time.Now()

	id, err := generateSecureRandomString()
	if err != nil {
		panic(err)
	}

	secret, err := generateSecureRandomString()
	if err != nil {
		panic(err)
	}

	secretHash := hashSecret(secret)

	token := id + "." + secret

	session := &Session{
		id:         id,
		secretHash: secretHash,
		createdAt:  currentTime,
	}

	sessionWithToken := &SessionWithToken{
		Session: *session,
		Token:   token,
	}

	err = sm.store.CreateSession(session)
	if err != nil {
		panic(err)
	}

	return sessionWithToken
}

func (sm *SessionManager) ValidateSessionToken(token string) (Session, error) {
	tokenParts := strings.Split(token, ".")
	if len(tokenParts) != 2 {
		return Session{}, nil
	}

	id := tokenParts[0]
	secret := tokenParts[1]
	tokenSecretHash := hashSecret(secret)

	session, err := sm.GetSession(id)
	if err != nil {
		return Session{}, err
	}

	isValidSecret := subtle.ConstantTimeCompare(tokenSecretHash[:], session.secretHash[:]) == 1
	if !isValidSecret {
		return Session{}, nil
	}

	return session, nil
}

func (sm *SessionManager) GetSession(id string) (Session, error) {
	session, err := sm.store.GetSession(id)
	if err != nil {
		return Session{}, err
	}

	if time.Since(session.createdAt).Seconds() >= sessionExpiriresInSeconds {
		sm.store.DeleteSession(id)
		return Session{}, errors.New("session expired")
	}

	return session, nil
}

func hashSecret(secret string) [32]byte {
	secretBytes := []byte(secret)
	secretHashBuffer := sha256.Sum256(secretBytes)
	return secretHashBuffer
}

func generateSecureRandomString() (string, error) {
	// Human readable alphabet (a-z, 0-9 without l, o, 0, 1 to avoid confusion)
	const charset = "abcdefghijkmnpqrstuvwxyz23456789"

	byteLength := 24
	b := make([]byte, byteLength)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}

	id := make([]byte, byteLength)
	for i := range id {
		id[i] = charset[b[i]>>3]
	}

	return string(id), nil
}

package api

import (
	"context"
	"time"
)

type Session struct {
	id         string
	secretHash [32]byte
	createdAt  time.Time
}

type Store interface {
	CreateSession(session *Session) error
	GetBrowse(ctx context.Context) ([]BrowseTeamData, error)
}

type API struct {
	store Store
}

package api

import (
	"time"

	"github.com/labstack/echo/v4"
)

type BrowseTeamData struct {
	id           string
	title        string
	rental_code  string
	description  string
	updated_at   time.Time
	username     string
	commentCount int
	upvoteCount  int
	team         []string
}

func (a *API) getBrowse(c echo.Context) error {
	ctx := c.Request().Context()

	data, err := a.store.GetBrowse(ctx)
	if err != nil {
		return c.JSON(500, "Internal Server Error")
	}

	return c.JSON(200, data)
}

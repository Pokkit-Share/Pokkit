package main

import "github.com/labstack/echo/v4"

// "github.com/Pokkit-Share/Pokkit/server/internal/session"

func main() {
	port := "5080"

	e := echo.New()

	e.Logger.Fatal(e.Start(port))
}

package main

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type SqliteRepository struct {
	db *sql.DB
}

func NewSqliteRepository(filename string) *SqliteRepository {
	db, err := sql.Open("sqlite3", filename)

}

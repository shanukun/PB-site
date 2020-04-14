package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

// SqliteRepository using struct for easy implementation
type SqliteRepository struct {
	db *sql.DB
}

// FindAll get list of creds with encrypted pass
func (r *SqliteRepository) FindAll() []Credential {
	stmt, err := r.db.Prepare(`
		select * from creds;
	`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Fatal(err)
	}

	creds := make([]Credential, 0)
	for rows.Next() {
		c := Credential{}
		err = rows.Scan(&c.CredID, &c.Domain, &c.Username, &c.Password)
		if err != nil {
			log.Fatal(err)
		}

		creds = append(creds, c)
	}

	return creds
}

// FindPass find password given domain and username
func (r *SqliteRepository) FindPass(cred Credential) string {
	stmt, err := r.db.Prepare(`
		select password from creds where cred_id=? 
	`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	var pass string
	err = stmt.QueryRow(cred.CredID).Scan(&pass)
	if err != nil {
		log.Fatal(err)
	}

	return pass
}

func (r *SqliteRepository) close() {
	r.db.Close()
}

// InsertNew insert new credentials
func (r *SqliteRepository) InsertNew(cred Credential) error {
	stmt, err := r.db.Prepare(`
		insert into creds (domain, username, password) values (?, ?, ?)
	`)
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	_, err = stmt.Exec(cred.Domain, cred.Username, cred.Password)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

// NewSqliteRepository initialize database
func NewSqliteRepository(filename string) *SqliteRepository {
	db, err := sql.Open("sqlite3", filename)
	if err != nil {
		log.Panicln("Unable to open sqlite database")
		return nil
	}

	credTable := `
		create table if not exists creds (
			user_id integer primary key autoincrement,
			domain text not null,
			username text not null,
			password text not null
		)
	`

	var stmt *sql.Stmt
	if stmt, err = db.Prepare(credTable); err != nil {
		log.Fatal("Failed to prepare stmt", stmt, err)
	}
	defer stmt.Close()
	if _, err = stmt.Exec(); err != nil {
		log.Fatal("Failed to exec stmt", err)
	}

	return &SqliteRepository{db: db}

}

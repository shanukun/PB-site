package main

import "net/http"

func prepareWebService() *ServiceImpl {
	var (
		credRepo CredRepository

		sqlitedb *SqliteRepository
	)

	sqlitedb = NewSqliteRepository("Creds")
	credRepo = sqlitedb

	service := &ServiceImpl{
		credRepo: credRepo,
	}
	return service
}

func main() {
	service := prepareWebService()
	router := NewRouter(service)
	http.ListenAndServe(":8000", router)
}

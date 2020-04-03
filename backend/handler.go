package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

var service Service

// NewRouter instantiate new router
func NewRouter(_service Service) *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/api/", landing)
	router.HandleFunc("/api/getpass", getPass)
	router.HandleFunc("/api/new", newEntry)
	return router
}

func landing(w http.ResponseWriter, r *http.Request) {

}

func newEntry(w http.ResponseWriter, r *http.Request) {

}

func getPass(w http.ResponseWriter, r *http.Request) {

}

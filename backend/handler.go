package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var service Service

var _get = 0
var _post = 1

// NewRouter instantiate new router
func NewRouter(_service Service) *mux.Router {
	service = _service

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/api/", landing)
	router.HandleFunc("/api/getpass", getPass)
	router.HandleFunc("/api/new", newEntry)
	return router
}

func landing(w http.ResponseWriter, r *http.Request) {
	setHeader(&w, _get)
	creds := service.GetAll()
	json.NewEncoder(w).Encode(creds)
}

func getPass(w http.ResponseWriter, r *http.Request) {
	setHeader(&w, _get)
	var cred Credential
	json.NewDecoder(r.Body).Decode(&cred)
	cred.Password = service.GetPass(cred)
	json.NewEncoder(w).Encode(cred)
}

func newEntry(w http.ResponseWriter, r *http.Request) {
	setHeader(&w, _post)
	var cred Credential
	json.NewDecoder(r.Body).Decode(&cred)
	err := service.EnterNew(cred)
	if err != nil {
		log.Fatal(err)
	}
	json.NewEncoder(w).Encode(struct{ done bool }{done: true})
}

func setHeader(w *http.ResponseWriter, method int) {
	(*w).Header().Set("Content-Type", "applications/x-www-form-urlencoded")
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:5000")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")

	switch method {
	case _get:
		(*w).Header().Set("Access-Control-Allow-Methods", "POST")
		break
	case _post:
		(*w).Header().Set("Access-Control-Allow-Methods", "GET")
		break
	}
}

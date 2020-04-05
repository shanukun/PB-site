package main

type CredRepository interface {
	FindAll() []Credential
	FindPass(cred Credential) string
	InsertNew(cred Credential) error
	close()
}

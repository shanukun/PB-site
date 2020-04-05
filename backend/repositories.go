package main

// CredRepository interface for database methods
type CredRepository interface {
	FindAll() []Credential
	FindPass(cred Credential) string
	InsertNew(cred Credential) error
	close()
}

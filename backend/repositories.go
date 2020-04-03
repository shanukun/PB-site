package main

type PassRepository interface {
	FindAll() []Credential
	FindPass(cred Credential) (string, error)
	InsertNew(cred Credential) error
}

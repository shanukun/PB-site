package main

type Service interface {
	getAll() []Credential
	getPass(cred Credential) string
	enterNew(cred Credential) error
}

type ServiceImpl struct {
	passRepository PassRepository
}

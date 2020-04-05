package main

import "log"

// Service interface for handler
type Service interface {
	GetAll() []Credential
	GetPass(cred Credential) string
	EnterNew(cred Credential) error
	close()
}

// ServiceImpl struct implementing the Service interface
type ServiceImpl struct {
	credRepo CredRepository
}

func (s *ServiceImpl) GetAll() []Credential {
	creds := s.credRepo.FindAll()
	return creds
}

func (s *ServiceImpl) GetPass(cred Credential) string {
	pass := s.credRepo.FindPass(cred)
	c := &Crypter{cred.Key, pass}
	pass, _ = c.Decrypt()
	return pass
}

func (s *ServiceImpl) EnterNew(cred Credential) error {
	c := &Crypter{cred.Key, cred.Password}
	cred.Password, _ = c.Encrypt()

	err := s.credRepo.InsertNew(cred)
	if err != nil {
		log.Fatal(err)
	}
	return nil
}

func (s *ServiceImpl) close() {
	s.credRepo.close()
}

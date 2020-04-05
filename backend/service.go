package main

import "log"

// Service interface for handler
type Service interface {
	GetAll() []Credential
	GetPass(crypt Crypter) string
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

func (s *ServiceImpl) GetPass(key string, cred Credential) string {
	pass := s.credRepo.FindPass(cred)
	c := &Crypter{key, pass}
	pass, _ = c.Decrypt()
	return pass
}

func (s *ServiceImpl) EnterNew(cred Credential) error {
	err := s.credRepo.InsertNew(cred)
	if err != nil {
		log.Fatal(err)
	}
	return nil
}

func (s *ServiceImpl) close() {
	s.credRepo.close()
}

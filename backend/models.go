package main

type Credential struct {
	CredID   int64  `json:"cred_id"`
	Domain   string `json:"domain"`
	Username string `json:"username"`
	Password string `json:"password"`
}

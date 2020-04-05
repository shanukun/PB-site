package main

// Credential model for Credentials
type Credential struct {
	CredID   int64  `json:"cred_id"`
	Domain   string `json:"domain"`
	Key      string `json:"key"`
	Password string `json:"password"`
	Username string `json:"username"`
}

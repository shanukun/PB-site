package main

func main() {

	passRepository := NewSqliteRepository()

	service := &ServiceImpl{passRepository}

}

import json
import crypto_lib


class SecretHandler():

    def __init__(self, key):
        self.data = {}
        self.crypter = crypto_lib.AESCipher(key)
        self.read_file()

    def read_file(self):
        with open('enc.json') as f:
            self.data = json.load(f)

    def write_data(self, new_data):
        site = new_data['site'].lower()
        new_data['password'] = self.crypter.encrypt(new_data['password']).decode('utf-8')
        self.data['pass'][site] = new_data

        with open('enc.json', 'w') as f:
            json.dump(self.data, f)

    def get_password(self, site):
        password = self.data['pass'][site]['password']
        return self.crypter.decrypt(password.encode()).decode('utf-8')

import sys
from app_drive import AppDrive
from secret_handler import SecretHandler


class Backend():
    def __init__(self):
        self.gd = None
        self.sh = None

    def gdrive_login(self):
        self.gd = AppDrive()
        is_logged = self.gd.is_loggedIn()
        if is_logged is None:
            self._logger('Cannot Login')
            return False
        self._logger('Logged In')
        return True

    def get_data(self, key):
        self.sh = SecretHandler(key)
        self.sh.read_file()
        return self.data

    def _logger(self, msg):
        func_name = sys._getframe(1).f_code.co_name
        print('[ %s ]: %s.', func_name, msg)

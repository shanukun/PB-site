from __future__ import print_function
import pickle
import os.path
from googleapiclient.http import MediaFileUpload
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request


SCOPES = ['https://www.googleapis.com/auth/drive.appdata',
          'https://www.googleapis.com/auth/drive.file']


def login_with_google():
    creds = None
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('drive', 'v3', credentials=creds)
    return service


def create_folder(service):
    file_metadata = {
        'name': 'passback2312',
        'mimeType': 'application/vnd.google-apps.folder'
    }

    file = service.files().create(body=file_metadata, fields='id').execute()

    folderId = file.get('id')
    print('Folder ID: %s' % folderId)
    create_file(service)


def create_file(service):
    file_metadata = {
        'name': 'enc_pass.json',
        'parents': ['appDataFolder']
    }

    media = MediaFileUpload('./env_pass.json',
                            mimetype='application/json', resumable=True)
    file = service.files().create(body=file_metadata,
                                  media_body=media, fields='id').execute()

    print ('File ID: %s ' % file.get('id'))


def listFile(service):
    # Call the Drive v3 API
    response = service.files().list(spaces='appDataFolder',
                                    fields='nextPageToken, files(id, name)',
                                    pageSize=10).execute()
    for file in response.get('files', []):
        # Process change
        print('Found file: %s (%s)' % (file.get('name'), file.get('id')))


if __name__ == '__main__':
    drive_service = login_with_google()
    create_file(drive_service)
    listFile(drive_service)

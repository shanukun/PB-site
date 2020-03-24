from __future__ import print_function
import io
import pickle
import os.path
from googleapiclient.http import MediaFileUpload, MediaIoBaseDownload
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


def create_file(service, file_name):
    file_metadata = {
        'name': file_name,
        'parents': ['appDataFolder']
    }
    media = MediaFileUpload(file_name,
                            mimetype='application/json',
                            resumable=True)
    file = service.files().create(body=file_metadata,
                                  media_body=media,
                                  fields='id').execute()

    print ('File Created ID: %s ' % file.get('id'))


def download_file(service, file_id):
    request = service.files().get_media(fileId=file_id)
    fh = io.BytesIO()
    # fh = io.FileIO('enc.json', mode='wb')
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print('Download %d%%.' % int(status.progress() * 100))


def list_file(service):
    # Call the Drive v3 API
    response = service.files().list(spaces='appDataFolder',
                                    fields='nextPageToken, files(id, name)',
                                    pageSize=10).execute()
    file = response.get('files', [])[0]
    # Process change
    print('Found File: %s (%s)' % (file.get('name'), file.get('id')))


def delete_file(service, file_id):
    service.files().delete(fileId=file_id).execute()
    print('Deleted: %s' % (file_id))

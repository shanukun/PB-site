from passback_end import Backend
from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
cors = CORS(app)
be = Backend()


@app.route("/api/gdrivelogin")
def gdrive_login():
    if (be.gdrive_login()):
        return jsonify(login=True)
    return jsonify(login=False)

@app.route('/api/passkey', methods=['POST'])
def key_for_password():
    content = request.json
    key = content["key"]
    be.get_data(key)
    return jsonify(recieved=True)

if __name__ == "__main__":
    app.run(debug=True)

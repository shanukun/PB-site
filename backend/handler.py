from passback_end import Backend
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
be = Backend()


@app.route("/api/gdrivelogin")
def gdrive_login():
    if (be.gdrive_login()):
        return jsonify(login=True)
    return jsonify(login=False)


if __name__ == "__main__":
    app.run(debug=True)

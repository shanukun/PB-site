from flask import Flask

app = Flask(__name__)


@app.route("/gdrivelogin")
def gdrive_login():
    pass


if __name__ == "__main__":
    app.run(debug=True)

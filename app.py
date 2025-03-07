from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///consultas.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Consulta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    data_consulta = db.Column(db.String(10), nullable=False)
    hora_consulta = db.Column(db.String(5), nullable=False)

@app.route("/", methods=["GET", "POST"])
def agendar():
    if request.method == "POST":
        nome = request.form["nome"]
        email = request.form["email"]
        telefone = request.form["telefone"]
        data_consulta = request.form["data"]
        hora_consulta = request.form["hora"]

        nova_consulta = Consulta(
            nome=nome, email=email, telefone=telefone,
            data_consulta=data_consulta, hora_consulta=hora_consulta
        )

        db.session.add(nova_consulta)
        db.session.commit()
        
        return redirect(url_for("listar"))

    return render_template("index.html")

@app.route("/consultas")
def listar():
    consultas = Consulta.query.all()
    return render_template("listar.html", consultas=consultas)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)

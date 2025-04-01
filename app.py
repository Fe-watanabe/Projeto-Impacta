from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///agendamentos.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Modelo do Banco de Dados
class Agendamento(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    telefone = db.Column(db.String(20), nullable=False)
    data = db.Column(db.String(10), nullable=False)
    hora = db.Column(db.String(5), nullable=False)

# Criar tabelas no banco
with app.app_context():
    db.create_all()

# Página de Agendamento
@app.route("/")
def index():
    return render_template("index.html")

# Rota para salvar agendamento
@app.route("/agendar", methods=["POST"])
def agendar():
    nome = request.form["nome"]
    email = request.form["email"]
    telefone = request.form["telefone"]
    data = request.form["data"]
    hora = request.form["hora"]

    novo_agendamento = Agendamento(nome=nome, email=email, telefone=telefone, data=data, hora=hora)
    db.session.add(novo_agendamento)
    db.session.commit()
    
    return redirect(url_for("listar_agendamentos"))

# Página para listar agendamentos
@app.route("/consultas")
def listar_agendamentos():
    agendamentos = Agendamento.query.all()
    return render_template("listar.html", agendamentos=agendamentos)

# Rota para excluir um agendamento
@app.route("/delete/<int:id>", methods=["POST"])
def delete_agendamento(id):
    agendamento = Agendamento.query.get(id)
    if agendamento:
        db.session.delete(agendamento)
        db.session.commit()
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "Agendamento não encontrado"}), 404

if __name__ == "__main__":
    app.run(debug=True)

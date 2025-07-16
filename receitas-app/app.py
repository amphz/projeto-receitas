# IMPORTAÇÕES

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

# VARIÁVEIS E CONFIGURAÇÕES

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# configurações específicas para o SQLite
caminho = os.path.dirname(os.path.abspath(__file__))
arquivobd = os.path.join(caminho, 'receitas.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + arquivobd

db = SQLAlchemy(app)

# CLASSES

class Receita(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.Text, nullable=False)
    ingredientes = db.Column(db.Text, nullable=False)
    modo_preparo = db.Column(db.Text, nullable=False)
    tempo_preparo = db.Column(db.Integer, nullable=False)  # em minutos
    porcoes = db.Column(db.Integer, nullable=False)
    categoria = db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.nome} - {self.categoria}, {self.porcoes} porções, {self.tempo_preparo} min'

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "ingredientes": self.ingredientes,
            "modo_preparo": self.modo_preparo,
            "tempo_preparo": self.tempo_preparo,
            "porcoes": self.porcoes,
            "categoria": self.categoria
        }

# ROTAS

@app.route("/")
def ola():
    return "backend receitas operante"

# Inserir receita
@app.route("/incluir_receita", methods=['POST'])
def incluir_receita():
    dados = request.get_json()
    try:
        nova = Receita(**dados)
        db.session.add(nova)
        db.session.commit()
        return jsonify({"resultado": "ok", "detalhes": "Receita adicionada"})
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

# Listar receitas
@app.route("/listar_receitas")
def listar_receitas():
    try:
        lista = db.session.query(Receita).all()
        lista_retorno = [x.json() for x in lista]
        return jsonify({"resultado": "ok", "detalhes": lista_retorno})
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

# Excluir receitas
@app.route("/excluir_receita/<int:receita_id>", methods=['DELETE'])
def excluir_receita(receita_id):
    try:
        receita = Receita.query.get(receita_id)
        if not receita:
            return jsonify({"resultado": "erro", "detalhes": "Receita não encontrada"})
        db.session.delete(receita)
        db.session.commit()
        return jsonify({"resultado": "ok", "detalhes": "Receita excluída"})
    except Exception as e:
        return jsonify({"resultado": "erro", "detalhes": str(e)})

# INICIO DA APLICAÇÃO

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
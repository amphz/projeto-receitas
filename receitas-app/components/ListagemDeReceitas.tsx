"use client";

import { useEffect, useState } from "react";

interface Receita {
  id: number;
  nome: string;
  ingredientes: string;
  modo_preparo: string;
  tempo_preparo: number;
  porcoes: number;
  categoria: string;
}

export default function ListagemDeReceitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/listar_receitas")
      .then((res) => res.json())
      .then((data) => {
        if (data.resultado === "ok") {
          setReceitas(data.detalhes);
        } else {
          setErro("Erro ao carregar receitas");
        }
      })
      .catch(() => setErro("Erro na conexão com backend"))
      .finally(() => setLoading(false));
  }, []);

  const excluirReceita = (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta receita?")) return;

    fetch(`http://localhost:5000/excluir_receita/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((dados) => {
        if (dados.resultado === "ok") {
          setReceitas(receitas.filter((r) => r.id !== id));
        } else {
          alert("Erro ao excluir receita: " + dados.detalhes);
        }
      })
      .catch(() => alert("Erro na conexão com o backend"));
  };

  if (loading) return <p>Carregando receitas...</p>;
  if (erro) return <p className="text-red-600">{erro}</p>;

  return (
    <div className="grid gap-6">
      {receitas.map((r) => (
        <div key={r.id} className="border p-4 rounded bg-pink-900 shadow text-white">
          <h3 className="font-bold text-xl mb-2">{r.nome}</h3>
          <p><strong>Ingredientes:</strong> {r.ingredientes}</p>
          <p><strong>Modo de preparo:</strong> {r.modo_preparo}</p>
          <p><strong>Tempo:</strong> {r.tempo_preparo} minutos</p>
          <p><strong>Porções:</strong> {r.porcoes}</p>
          <p><strong>Categoria:</strong> {r.categoria}</p>
          <button
            onClick={() => excluirReceita(r.id)}
            className="mt-4 inline-block text-sm bg-blue-300 hover:bg-blue-400 text-black px-3 py-1 rounded"
          >
            🗑️ Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function FormularioReceita() {
  const [nome, setNome] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState(0);
  const [porcoes, setPorcoes] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");

  const cadastrarReceita = async () => {
    if (
      !nome.trim() ||
      !ingredientes.trim() ||
      !modoPreparo.trim() ||
      !tempoPreparo ||
      !porcoes ||
      !categoria.trim()
    ) {
      setMensagem("Preencha todos os campos corretamente antes de cadastrar.");
      return;
    }

    const receita = {
      nome,
      ingredientes,
      modo_preparo: modoPreparo,
      tempo_preparo: tempoPreparo,
      porcoes,
      categoria,
    };

    const resposta = await fetch("http://localhost:5000/incluir_receita", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(receita),
    });

    const dados = await resposta.json();

    if (dados.resultado === "ok") {
      setMensagem("Receita cadastrada com sucesso!");
      // limpa o formulário
      setNome("");
      setIngredientes("");
      setModoPreparo("");
      setTempoPreparo(0);
      setPorcoes(0);
      setCategoria("");
    } else {
      setMensagem("Erro ao cadastrar: " + dados.detalhes);
    }
  };

  return (
    <div className="bg-pink-900 shadow p-6 rounded-lg max-w-xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Cadastrar Nova Receita</h2>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome da receita"
          className="border p-2 rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <textarea
          placeholder="Ingredientes"
          className="border p-2 rounded"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
        />
        <textarea
          placeholder="Modo de preparo"
          className="border p-2 rounded"
          value={modoPreparo}
          onChange={(e) => setModoPreparo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Tempo de preparo (min)"
          className="border p-2 rounded"
          value={tempoPreparo}
          onChange={(e) => setTempoPreparo(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Porções"
          className="border p-2 rounded"
          value={porcoes}
          onChange={(e) => setPorcoes(parseInt(e.target.value))}
        />
        <select
          className="bg-pink-900 border p-2 rounded w-full text-white"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option className="bg-blue-300 text-black" value="">
            Selecione a categoria
          </option>
          <option className="bg-blue-300 text-black" value="sobremesa">
            Sobremesa
          </option>
          <option className="bg-blue-300 text-black" value="prato principal">
            Prato principal
          </option>
          <option className="bg-blue-300 text-black" value="salada">
            Salada
          </option>
          <option className="bg-blue-300 text-black" value="lanche">
            Lanche
          </option>
          <option className="bg-blue-300 text-black" value="bebida">
            Bebida
          </option>
          <option className="bg-blue-300 text-black" value="aperitivo">
            Aperitivo
          </option>
          <option className="bg-blue-300 text-black" value="café da manhã">
            Café da manhã
          </option>
        </select>
        <button
          className="bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
          onClick={cadastrarReceita}
        >
          Cadastrar Receita
        </button>
        {mensagem && <p className="text-center text-sm mt-2">{mensagem}</p>}
      </div>
    </div>
  );
}

import FormularioReceita from "@/components/FormularioReceita";
import ListagemDeReceita from "@/components/ListagemDeReceitas";

export default function PaginaReceitas() {
  return (
    <main className="p-6 bg-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-900">Receitas Cadastradas</h1>
      <FormularioReceita />
      <div className="mt-8">
        <ListagemDeReceita />
      </div>
    </main>
  );
}

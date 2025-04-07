"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usuarioService } from "@/lib/request/usuarios";

export default function CadastroEndereco() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    complemento: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Protege a página: se não tiver token, manda para login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buscarCEP = async () => {
    if (formData.cep.length !== 8) return;

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${formData.cep}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        setErro("CEP inválido.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        rua: data.logradouro,
      }));

      setErro("");
    } catch (error) {
      setErro("Erro ao buscar o CEP.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setMensagem("");
    setIsLoading(true);

    try {
      await usuarioService.cadastrarEndereco(formData);
      setMensagem("Endereço cadastrado com sucesso!");

      // Aguarda 1 segundo e redireciona para página de endereços
      setTimeout(() => {
        router.push("/enderecos");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro("Erro desconhecido ao cadastrar endereço.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-zinc-800">
          Cadastro de Endereço
        </h1>

        {mensagem && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded border border-green-300">
            {mensagem}
          </div>
        )}
        {erro && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded border border-red-300">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-zinc-700">
                CEP
              </label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                onBlur={buscarCEP}
                maxLength={8}
                required
                className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Número
              </label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Complemento
            </label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Estado
              </label>
              <input
                type="text"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                readOnly
                className="w-full px-4 py-2 rounded border bg-zinc-100 border-zinc-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700">
                Cidade
              </label>
              <input
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                readOnly
                className="w-full px-4 py-2 rounded border bg-zinc-100 border-zinc-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Bairro
            </label>
            <input
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">
              Rua
            </label>
            <input
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all"
            >
              {isLoading ? "Salvando..." : "Salvar Endereço"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-full py-3 px-4 bg-zinc-200 text-zinc-800 rounded-lg hover:bg-zinc-300 transition-all"
            >
              Pular etapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

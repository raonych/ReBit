"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usuarioService } from "@/lib/request/usuarios";
import Link from "next/link";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    termos: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.termos) {
      setError("Você deve aceitar os termos e condições");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await usuarioService.cadastrar({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });
      router.push("/enderecos");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido no cadastro");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: 'url("/Background.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        href="/"
        className="flex items-center gap-2 mb-8 cursor-pointer select-none"
      >
        <span className="text-gray-500 text-xl">✺</span>
        <span className="font-semibold text-2xl text-gray-800">ReBit</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] p-8 transition-all hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.15)]">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Crie sua conta
        </h1>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome completo
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-gray-900 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 text-gray-900 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-2.5 text-gray-900 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
            <p className="mt-1 text-xs text-zinc-500">Mínimo 6 caracteres</p>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="termos"
                name="termos"
                type="checkbox"
                checked={formData.termos}
                onChange={handleChange}
                required
                className="w-4 h-4 text-zinc-800 bg-zinc-100 border-zinc-300 rounded"
              />
            </div>
            <label htmlFor="termos" className="ml-2 text-sm text-zinc-700">
              Eu concordo com os{" "}
              <a href="#" className="font-medium text-zinc-900 hover:underline">
                Termos e Condições
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-800 transition-colors ${
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cadastrando...
              </span>
            ) : (
              "Cadastrar"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600">
          Já tem uma conta?{" "}
          <a
            href="/login"
            className="font-medium text-zinc-900 hover:underline"
          >
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
}

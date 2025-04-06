"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usuarioService } from "@/lib/request/usuarios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    manterLogado: false,
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
    setIsLoading(true);
    setError("");

    try {
      await usuarioService.logar({
        email: formData.email,
        senha: formData.senha,
        manterLogado: formData.manterLogado,
      });
      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido no login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)] p-8 transition-all hover:shadow-[0_6px_24px_-2px_rgba(0,0,0,0.15)]">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Acesse sua conta
        </h1>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-2.5 text-gray-900 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-800 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="manterLogado"
                name="manterLogado"
                type="checkbox"
                checked={formData.manterLogado}
                onChange={handleChange}
                className="w-4 h-4 text-zinc-800 bg-zinc-100 border-zinc-300 rounded"
              />
            </div>
            <label
              htmlFor="manterLogado"
              className="ml-2 text-sm text-zinc-700"
            >
              Manter-se conectado
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
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-600">
          Ainda não tem uma conta?{" "}
          <a
            href="/cadastro"
            className="font-medium text-zinc-900 hover:underline"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
}

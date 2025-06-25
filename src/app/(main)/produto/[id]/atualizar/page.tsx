"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { categoriaService } from "@/lib/request/categorias"
import { produtoService } from "@/lib/request/produto"
import { usuarioService } from "@/lib/request/usuarios"
import { Loader } from "lucide-react"

export default function AtualizacaoProduto() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [categorias, setCategorias] = useState<any[]>([])
  const [imagemFile, setImagemFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [vendedorId, setVendedorId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [produtoData, setProdutoData] = useState<any>({
    nome: "",
    descricao: "",
    preco: "",
    categoriaId: "",
    condicao: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log("produtoID", id)
      try {
        const userId = await usuarioService.exibirPerfil()
        const produtoFetch = await produtoService.produtoUnico(id)
        setProdutoData({
          nome: produtoFetch.nome || "",
          descricao: produtoFetch.descricao || "",
          preco: produtoFetch.preco || "",
          categoriaId: produtoFetch.categoria?.id || "",
          condicao: produtoFetch.condicao || "",
        })
        setPreviewUrl(produtoFetch.fotos[0]?.url)
        const data = await categoriaService.categorias()
        setVendedorId(userId.id)
        setCategorias(data.categorias)
        setIsLoading(false)
      } catch (error: any) {
        if (error.status == 401) {
          router.push("/login")
        }
      }
    }

    fetchData()
  }, [id, router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImagemFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProdutoData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let imagemUrl = previewUrl

    if (imagemFile) {
      const formData = new FormData()
      formData.append("file", imagemFile)

      const imageUploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!imageUploadResponse.ok) {
        alert("Erro ao fazer upload da imagem")
        return
      }

      const imageData = await imageUploadResponse.json()
      imagemUrl = imageData.url
    }

    const precoNumerico = Number.parseFloat(produtoData.preco)
    if (isNaN(precoNumerico)) {
      alert("Preço inválido")
      return
    }

    const dados = {
      nome: produtoData.nome,
      descricao: produtoData.descricao,
      preco: precoNumerico,
      condicao: produtoData.condicao.toLowerCase(),
      categoriaId: produtoData.categoriaId,
      vendedorId,
      imagemUrl,
    }

    console.log(dados)
    try {
            console.log(dados)
      await produtoService.atualizarProduto(dados, id)
      alert("Produto atualizado com sucesso!")
      router.push("/produtos")
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Erro ao atualizar produto")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 h-8 w-8 text-gray-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-gray-300 rounded-lg overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Pré-visualização"
                  className="w-full h-[400px] object-cover"
                />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center text-gray-500">
                  Pré-visualização da imagem
                </div>
              )}
            </div>

            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="imagemInput" />
            <label
              htmlFor="imagemInput"
              className="text-center border border-gray-400 text-gray-600 hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer transition w-full"
            >
              {previewUrl ? "Trocar Imagem" : "Selecionar Imagem"}
            </label>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              value={produtoData.nome}
              onChange={handleChange}
              className="border rounded px-4 py-3"
              required
            />
            <input
              type="number"
              id="preco"
              name="preco"
              placeholder="Preço"
              value={produtoData.preco}
              onChange={handleChange}
              className="border rounded px-4 py-3"
              required
            />

            <select
              name="categoriaId"
              value={produtoData.categoriaId}
              onChange={handleChange}
              className="border rounded px-4 py-3"
              required
            >
              <option value="">Categoria</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>

            <select
              name="condicao"
              value={produtoData.condicao}
              onChange={handleChange}
              className="border rounded px-4 py-3"
              required
            >
              <option value="">Condição</option>
              <option value="Usado">Usado</option>
              <option value="Danificado">Danificado</option>
              <option value="Seminovo">Seminovo</option>
            </select>

            <textarea
              name="descricao"
              placeholder="Descritivo"
              value={produtoData.descricao}
              onChange={handleChange}
              className="border rounded px-4 py-3 h-48 resize-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-md font-semibold transition"
          >
            Atualizar Produto
          </button>
        </div>
      </form>
    </div>
  )
}

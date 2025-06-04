import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface EnderecoFormProps {
  endereco?: {
    id: number;
    rua: string;
    numero: string;
    bairro: string;
    complemento?: string;
    cidade: string;
    UF: string;
    cep: string;
  };
  onSubmit: (dados: any) => void;
  onCancel?: () => void;
}

export default function EnderecoForm({ endereco, onSubmit, onCancel }: EnderecoFormProps) {
  const [formData, setFormData] = useState({
    cep: endereco?.cep || '',
    estado: endereco?.UF || '',
    cidade: endereco?.cidade || '',
    bairro: endereco?.bairro || '',
    rua: endereco?.rua || '',
    numero: endereco?.numero || '',
    complemento: endereco?.complemento || '',
  });

  const [erro, setErro] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const buscarCEP = async () => {
    if (formData.cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro('CEP inválido.');
        return;
      }

      setFormData(prev => ({
        ...prev,
        estado: data.uf,
        cidade: data.localidade,
        bairro: data.bairro,
        rua: data.logradouro,
      }));

      setErro('');
    } catch (error) {
      setErro('Erro ao buscar o CEP.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-zinc-200">
      <div className="flex items-center gap-2 mb-4">
        <MapPin size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold">
          {endereco ? 'Editar Endereço' : 'Novo Endereço'}
        </h3>
      </div>

      {erro && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded border border-red-300">
          {erro}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-zinc-700">CEP</label>
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
          <label className="block text-sm font-medium text-zinc-700">Número</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-zinc-700">Rua</label>
          <input
            type="text"
            name="rua"
            value={formData.rua}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Estado</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            maxLength={2}
            required
            className="w-full px-4 py-2 rounded border bg-zinc-50 border-zinc-300"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Salvar
        </button>
      </div>
    </form>
  );
} 
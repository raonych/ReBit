'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}


export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[] | null>(null);
  const [error, setError] = useState('');

 

  async function listUser(){
    try {
      const response = await fetch('/api/users');

      const data = await response.json();
      setData(data);
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || 'Algo deu errado');
      }    
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Aconteceu algo de errado');
    } finally {
      setLoading(false);
    }
 
  };
 
  data?? listUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Lista de usuario
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="max-w-md w-full mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
        {loading ? (
            <p className="text-center text-gray-600">Carregando...</p>
          ) : (
            <ul className="space-y-4">
              {data?.map((user: { id: string; name: string; email: string }) => (
                <li key={user.id} className="p-4 border rounded-md shadow-sm">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </li>
              ))}
            </ul>
          )}
          
        </div>
      </div>
      </div>
    </div>
  );
}
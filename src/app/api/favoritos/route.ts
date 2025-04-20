import { NextResponse } from 'next/server';
import { exibeFavoritos} from "@/lib/services/favoritosService";
import { getUserIdFromToken } from '@/lib/auth';

export async function GET(request: Request){
    const userId = getUserIdFromToken(request);

    if (!userId) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      const favoritos = await exibeFavoritos(userId);

      return NextResponse.json(favoritos.data, {status: favoritos.status});
}
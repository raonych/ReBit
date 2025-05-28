import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import multer from 'multer';

const uploadDir = path.join(process.cwd(), 'public/uploadImages');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const ext = file.name.split('.').pop();
  const uniqueName = `${randomUUID()}.${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/uploadImages/${uniqueName}` });
}

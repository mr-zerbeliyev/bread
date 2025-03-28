import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Product } from '@/app/types/product';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'product.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    
    if (!Array.isArray(data)) {
      throw new Error("Geçersiz veri formatı: Veri bir dizi değil");
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Veri okuma hatası:", error);
    return NextResponse.json(
      { error: "Ürünler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 
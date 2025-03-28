import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { Product } from '@/app/types/product';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'product.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const products: Product[] = JSON.parse(jsonData);
    
    const product = products.find(p => p.id.toString() === params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error("Veri okuma hatası:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 
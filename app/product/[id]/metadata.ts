import { Metadata } from "next";
import path from 'path';
import fs from 'fs/promises';
import { Product } from "@/app/types/product";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'product.json');
    const jsonData = await fs.readFile(filePath, 'utf8');
    const products: Product[] = JSON.parse(jsonData);
    const product = products.find(p => p.id.toString() === id);
    return product || null;
  } catch (error) {
    console.error("Ürün verisi okuma hatası:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return {
    title: product ? product.name : 'Ürün Bulunamadı',
    description: product ? product.description : 'Ürün bulunamadı',
    openGraph: {
      title: product ? product.name : 'Ürün Bulunamadı',
      description: product ? product.description : 'Ürün bulunamadı',
      images: product ? [product.image] : [],
    },
  };
} 
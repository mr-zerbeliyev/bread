import Image from "next/image";
import { Product } from "@/app/types/product";
import { Metadata } from "next";
import path from 'path';
import fs from 'fs/promises';

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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);
  return {
    title: product ? product.name : 'Ürün Bulunamadı',
    description: product ? product.description : 'Ürün bulunamadı',
  };
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h2>
          <p className="text-gray-600">Bu ürün mevcut değil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-2xl font-bold text-[#795757]">
                {product.price.toLocaleString('tr-TR')} ₺
              </p>
              <button className="bg-[#795757] text-white px-6 py-2 rounded-md hover:bg-[#6a4a4a] transition-colors">
                Səbətə Əlavə Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

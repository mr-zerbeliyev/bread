import Card from "@/components/card";
import { Product } from "@/app/types/product";
import React from "react";
import path from 'path';
import fs from 'fs/promises';

// Sunucu tarafında veri çeken async fonksiyon
async function getProducts(): Promise<Product[]> {
  try {
    // Dosya yolunu oluştur
    const filePath = path.join(process.cwd(), 'public', 'data', 'product.json');
    
    // Dosyayı oku
    const jsonData = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(jsonData);
    
    if (!Array.isArray(data)) {
      throw new Error("Geçersiz veri formatı: Veri bir dizi değil");
    }
    
    return data;
  } catch (error) {
    console.error("Veri okuma hatası:", error);
    throw error;
  }
}

export default async function ProductsPage() {
  let products: Product[] = [];
  let error: string | null = null;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Veri çekme hatası:", error);
    error = error instanceof Error ? error.message : "Bilinmeyen bir hata oluştu";
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Hata Oluştu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-[#795757] text-white py-2 px-4 rounded hover:bg-[#6a4a4a] transition-colors"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ürün Bulunamadı</h2>
          <p className="text-gray-600">Henüz ürün eklenmemiş.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <Card products={products} />
    </div>
  );
}

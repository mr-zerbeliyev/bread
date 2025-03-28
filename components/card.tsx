"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/product";

interface CardProps {
  products: Product[];
}

export default function Card({ products }: CardProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Hepsi");

  const categories = useMemo(() => 
    ["Hepsi", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() =>
    selectedCategory === "Hepsi"
      ? products
      : products.filter((product) => product.category === selectedCategory),
    [products, selectedCategory]
  );

  return (
    <div className="mt-10">
      <div 
        className="flex justify-center mb-4 flex-wrap gap-2"
        role="tablist"
        aria-label="Ürün kategorileri"
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedCategory === category
                ? "bg-[#795757] text-white"
                : "bg-[#A79277] text-white hover:bg-[#8b7a65]"
            }`}
            onClick={() => setSelectedCategory(category)}
            role="tab"
            aria-selected={selectedCategory === category}
            aria-label={`${category} kategorisini seç`}
          >
            {category}
          </button>
        ))}
      </div>

      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        role="grid"
        aria-label="Ürün listesi"
      >
        {filteredProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group"
            aria-label={`${product.name} ürününün detaylarına git`}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <p className="text-[#795757] font-bold">{product.price.toLocaleString('tr-TR')} ₺</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

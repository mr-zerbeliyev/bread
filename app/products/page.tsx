'use client';

import React from 'react';
import { Product } from "@/app/types/product";
import { 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button,
  Box,
  Paper,
  Stack
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import Image from "next/image";
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">Yükleniyor...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" color="error" gutterBottom>
            Hata Oluştu
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => window.location.reload()}
            sx={{
              bgcolor: '#795757',
              '&:hover': {
                bgcolor: '#6a4a4a',
              },
            }}
          >
            Sayfayı Yenile
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ürün Bulunamadı
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Henüz ürün eklenmemiş.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
        {products.map((product) => (
          <Card 
            key={product.id}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
          >
            <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
              <CardMedia
                component="div"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: '4px 4px 0 0'
                  }}
                  priority
                />
              </CardMedia>
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                {product.price.toLocaleString('tr-TR')} ₺
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                component={Link}
                href={`/product/${product.id}`}
                size="small"
                sx={{ 
                  color: '#795757',
                  '&:hover': {
                    bgcolor: 'rgba(121, 87, 87, 0.1)',
                  }
                }}
              >
                Detaylar
              </Button>
              <Button
                size="small"
                startIcon={<ShoppingCart />}
                sx={{
                  ml: 'auto',
                  color: '#795757',
                  '&:hover': {
                    bgcolor: 'rgba(121, 87, 87, 0.1)',
                  }
                }}
              >
                Sepete Ekle
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

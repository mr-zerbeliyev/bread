'use client';

import React from 'react';
import Image from "next/image";
import { Product } from "@/app/types/product";
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`/api/products/${resolvedParams.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Ürün bulunamadı');
          }
          throw new Error('Ürün yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6">Yükleniyor...</Typography>
        </Paper>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ürün Bulunamadı
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error || "Bu ürün mevcut değil."}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        <Box flex={1}>
          <Card>
            <Box sx={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
              <CardMedia
                component="div"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ 
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                  priority
                />
              </CardMedia>
            </Box>
          </Card>
        </Box>
        <Box flex={1}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                {product.price.toLocaleString('tr-TR')} ₺
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<ShoppingCart />}
                fullWidth
                sx={{
                  bgcolor: '#795757',
                  '&:hover': {
                    bgcolor: '#6a4a4a',
                  },
                }}
              >
                Səbətə Əlavə Et
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Stack>
    </Container>
  );
}

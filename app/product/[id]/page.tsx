import Image from "next/image";
import { Product } from "@/app/types/product";
import { Metadata } from "next";
import path from 'path';
import fs from 'fs/promises';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

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
  };
}

interface PageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ürün Bulunamadı
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bu ürün mevcut değil.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <Box sx={{ position: 'relative', height: 500 }}>
              <CardMedia
                component="div"
                sx={{ position: 'relative', height: '100%' }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </CardMedia>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </Container>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Button,
  Box 
} from '@mui/material';
import { BakeryDining } from '@mui/icons-material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#795757' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <BakeryDining sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            BREAD DELIGHTS
          </Typography>
          <Box>
            <Button
              component={Link}
              href="/"
              sx={{ color: 'white' }}
            >
              Ana Sayfa
            </Button>
            <Button
              component={Link}
              href="/products"
              sx={{ color: 'white' }}
            >
              Ürünler
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

'use client';

import { CartProvider } from '@/contexts/CartContext';
import { ReactNode } from 'react';

interface ClientCartProviderProps {
  children: ReactNode;
}

export default function ClientCartProvider({ children }: ClientCartProviderProps) {
  return <CartProvider>{children}</CartProvider>;
}

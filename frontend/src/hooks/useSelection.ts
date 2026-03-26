import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export const useSelection = () => {
  const [selection, setSelection] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('couture-selection');
    if (saved) setSelection(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('couture-selection', JSON.stringify(selection));
  }, [selection]);

  const addToSelection = (product: Product) => {
    if (!selection.find(item => item.id === product.id)) {
      setSelection([...selection, product]);
    }
  };

  const removeFromSelection = (id: number) => {
    setSelection(selection.filter(item => item.id !== id));
  };

  const clearSelection = () => setSelection([]);

  const totalPrice = selection.reduce((sum, item) => sum + item.price, 0);

  return { selection, addToSelection, removeFromSelection, clearSelection, totalPrice, count: selection.length };
};
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
  // 1. Initialisation unique : On lit le localStorage UNE SEULE FOIS au démarrage
  const [selection, setSelection] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('couture-selection');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erreur de lecture du localStorage", error);
      return [];
    }
  });

  // 2. Sauvegarde automatique : Dès que 'selection' change, on écrit dans le localStorage
  useEffect(() => {
    localStorage.setItem('couture-selection', JSON.stringify(selection));
  }, [selection]);

  const addToSelection = (product: Product) => {
    setSelection((prev) => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromSelection = (id: number) => {
    setSelection((prev) => prev.filter(item => item.id !== id));
  };

  const clearSelection = () => {
    setSelection([]);
    localStorage.removeItem('couture-selection');
  };

  const totalPrice = selection.reduce((sum, item) => sum + Number(item.price), 0);

  return { 
    selection, 
    addToSelection, 
    removeFromSelection, 
    clearSelection, 
    totalPrice, 
    count: selection.length 
  };
};
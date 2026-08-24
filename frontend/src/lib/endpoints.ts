// Centralise tous les endpoints de l'API backend en un seul endroit.
// Toute requête vers le backend doit passer par ces constantes plutôt que
// de reconstruire une URL "à la main" dans un composant.
import { API_URL } from './api';

export const ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/login`,
    updatePassword: `${API_URL}/api/auth/update-password`,
    updateProfile: `${API_URL}/api/auth/update-profile`,
  },
  products: {
    list: `${API_URL}/api/products`,
    byId: (id: number | string) => `${API_URL}/api/products/${id}`,
  },
  testimonials: {
    approved: `${API_URL}/api/testimonials/approved`,
    all: `${API_URL}/api/testimonials`,
    create: `${API_URL}/api/testimonials`,
    approve: (id: number | string) => `${API_URL}/api/testimonials/approve/${id}`,
    byId: (id: number | string) => `${API_URL}/api/testimonials/${id}`,
  },
  clientPhotos: {
    list: `${API_URL}/api/client-photos`,
    byId: (id: number | string) => `${API_URL}/api/client-photos/${id}`,
  },
  contact: `${API_URL}/api/contact`,
};

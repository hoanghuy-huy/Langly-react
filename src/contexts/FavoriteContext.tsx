import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

type Course = {
  image: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  category: string;
  instructor: string;
  duration: string;
  level: string;
};

type FavoriteContextType = {
  favorites: Course[];
  addToFavorites: (course: Course) => void;
  removeFromFavorites: (courseName: string) => void;
  isFavorite: (courseName: string) => boolean;
  toggleFavorite: (course: Course) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
};

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Course[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (course: Course) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.name === course.name);
      if (!exists) {
        return [...prev, course];
      }
      return prev;
    });
    // Kiểm tra lại sau khi setFavorites (bằng local state hoặc callback)
    if (!favorites.some(fav => fav.name === course.name)) {
      toast.success('Đã thêm vào yêu thích!');
    }
  };

  const removeFromFavorites = (courseName: string) => {
    setFavorites(prev => prev.filter(fav => fav.name !== courseName));
    toast.success('Đã bỏ khỏi yêu thích!');
  };

  const isFavorite = (courseName: string) => {
    return favorites.some(fav => fav.name === courseName);
  };

  const toggleFavorite = (course: Course) => {
    if (isFavorite(course.name)) {
      removeFromFavorites(course.name);
    } else {
      addToFavorites(course);
    }
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

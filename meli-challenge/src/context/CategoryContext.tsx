import React, { createContext, useContext, useState, ReactNode } from 'react';

type CategoryContextType = {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

// Create a custom provider component
export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

// Create a custom hook to access the category context
export function useCategory() {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
}

import { createContext, useState, useEffect, useCallback, ReactNode, FC } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const menuDataInitialState = {
  menuItemsByCategory: {}, 
  menuItemsById: {}
}

export type ProviderProps = {
  children?: ReactNode
}

export type Item = {
  id: Number,
  name: string,
  description: string,
  eightysix: Boolean | null,
  price: string,
  calories: Number,
  created_at: string,
  updated_at: string,
  archived: Boolean,
  category: string,
  photo_url: string
}

export const defaultItemState = {
  id: 0,
  name: "",
  description: "",
  eightysix: null,
  price: "",
  calories: 0,
  created_at: "",
  updated_at: "",
  archived: false,
  category: "",
  photo_url: ""
}

export type Category = {
  id: Number,
  name: string,
  created_at: string,
  updated_at: string,
  items: Item[]
}

export const defaultCategoryState = {
  id: 0,
  name: "",
  created_at: "",
  updated_at: "",
  items: []
}

export type MenuContextProps = {
  loadingMenu: Boolean,
  menuError: string | null,
  categories: Category[],
  getMenuItemsByCategory: (category: string) => Category | null,
  getMenuItemById: (id: string) => Item 
}

export const MenuContext = createContext<MenuContextProps>({
  loadingMenu: true,
  menuError: null,
  categories: [],
  getMenuItemsByCategory: () => defaultCategoryState,
  getMenuItemById: () => defaultItemState

});

export const MenuProvider: FC<ProviderProps> = ({children}) => {
  const [menuData, setMenuData] = useState(menuDataInitialState)
  const [loadingMenu, setLoadingMenu] = useState(true)
  const [menuError, setMenuError] = useState(null);

  const { menuItemsByCategory, menuItemsById } = menuData;
  const categories: Category[] = Object.values(menuItemsByCategory);

  useEffect(() => {
    fetch(`${API_BASE_URL}/menu`)
      .then(response => response.json()
        .then((data) => setMenuData(data))
        .catch(({message}) => setMenuError(message)))
      .catch(({message}) => setMenuError(message))
      .finally(() => setLoadingMenu(false))
  },[])

  const getMenuItemsByCategory = useCallback((category: string): Category => menuItemsByCategory[category as keyof typeof menuItemsByCategory], [menuItemsByCategory]);
  const getMenuItemById = useCallback((id: string): Item => menuItemsById[id as keyof typeof menuItemsById], [menuItemsById]);

  const value = {
    loadingMenu,
    menuError,
    categories,
    getMenuItemsByCategory,
    getMenuItemById
  };

  return <MenuContext.Provider value={value} >{children}</MenuContext.Provider>
}

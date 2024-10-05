import { createContext, useState, useEffect, useCallback } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const menuDataInitialState = {
  menuItemsByCategory: {}, 
  menuItemsById: {}
}

export const MenuContext = createContext();

export const MenuProvider = ({children}) => {
  const [menuData, setMenuData] = useState(menuDataInitialState)
  const [loadingMenu, setLoadingMenu] = useState(true)
  const [menuError, setMenuError] = useState(null);

  const { menuItemsByCategory, menuItemsById } = menuData;
  const categories = Object.values(menuItemsByCategory);

  useEffect(() => {
    fetch(`${API_BASE_URL}/menu`)
      .then(response => response.json()
        .then((data) => setMenuData(data))
        .catch(({message}) => setMenuError(message)))
      .catch(({message}) => setMenuError(message))
      .finally(() => setLoadingMenu(false))
  },[])

  useEffect(() => console.log({menuData}),[menuData])
  useEffect(() => console.log({loadingMenu}),[loadingMenu])

  const getMenuItemsByCategory = useCallback((category) => menuItemsByCategory[category], [menuItemsByCategory]);
  const getMenuItemById = useCallback((id) => menuItemsById[id], [menuItemsById]);

  const value = {
    loadingMenu,
    menuError,
    categories,
    getMenuItemsByCategory,
    getMenuItemById
  };

  return <MenuContext.Provider value={value} >{children}</MenuContext.Provider>
}

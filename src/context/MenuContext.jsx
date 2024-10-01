import { createContext, useState, useEffect, useCallback, useMemo } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MenuContext = createContext();

export const MenuProvider = ({children}) => {
  const [categories, setCategories] = useState(null)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [items, setItems] = useState(null)
  const [itemsLoading, setItemsLoading] = useState(true)

    const buildCategoriesObj = useCallback((categoriesArr) => 
      categoriesArr.reduce((acc, curr) => ({
        ...acc,
        [curr.name]: {
          ...curr,
          items: []
        }
      }), {}), 
    [])
  
    useEffect(() => {
      fetch(`${API_BASE_URL}/categories`)
        .then(response => response.json()
          .then(categories => setCategories(categories)))
          .catch(jsonErr => console.log({jsonErr}))
        .catch(err => console.log({err}))
        .finally(() => setCategoriesLoading(false))
    },[buildCategoriesObj])
  
    useEffect(() => {
      fetch(`${API_BASE_URL}/items`)
        .then(response => response.json()
          .then(items => setItems(items)))
          .catch(jsonErr => console.log({jsonErr}))
        .catch(err => console.log({err}))
        .finally(() => setItemsLoading(false))
    },[])

    const menuItemsByCategory = useMemo(() => categories 
      ? items?.reduce((acc, curr) => ({
          ...acc,
          [curr.category?.toLowerCase()]: {
            ...acc[curr.category], 
            items: [...acc[curr.category].items, curr]
          }
        }), buildCategoriesObj(categories)) || {}
      : {}, 
    [buildCategoriesObj, categories, items])

   const getMenuItemsByCategory = (category) => menuItemsByCategory[category];

   const loadingMenu = categoriesLoading || itemsLoading;
    
    const value = {
      loadingMenu,
      categories, items,
      menuItemsByCategory,
      getMenuItemsByCategory
    };

    return <MenuContext.Provider value={value} >{children}</MenuContext.Provider>
}

import { createContext, useState, useEffect, useCallback, useMemo } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MenuContext = createContext();

export const MenuProvider = ({children}) => {
    const [categories, setCategories] = useState(null)
    const [items, setItems] = useState(null)

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
          .then(categories => setCategories(buildCategoriesObj(categories))))
          .catch(jsonErr => console.log({jsonErr}))
        .catch(err => console.log({err}))
    },[buildCategoriesObj])
  
    useEffect(() => {
      fetch(`${API_BASE_URL}/items`)
        .then(response => response.json()
          .then(items => setItems(items)))
          .catch(jsonErr => console.log({jsonErr}))
        .catch(err => console.log({err}))
    },[])

    const menuItemsByCategory = useMemo(() => categories 
      ? items?.reduce((acc, curr) => ({
          ...acc,
          [curr.category]: {
            ...acc[curr.category], 
            items: [...acc[curr.category].items, curr]
          }
        }), categories) 
      : null, 
    [categories, items])
    
    const value = {
      categories, items,
      menuItemsByCategory
    };

    return <MenuContext.Provider value={value} >{children}</MenuContext.Provider>
}

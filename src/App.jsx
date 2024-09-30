import { useContext, useEffect } from 'react'
import ItemCard from './components/ItemCard'
import { MenuContext } from './context/MenuContext'

import './App.css'

function App() {
  const { categories, items } = useContext(MenuContext);

  useEffect(() => console.log({categories}), [categories])
  useEffect(() => console.log({items}), [items])

  return (
    <>
      { !items 
        ? <h1>Loading</h1>
        : (
          <>
            <h1>Menu</h1>
            { items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </>
        )

      }
    </>
  )
}

export default App

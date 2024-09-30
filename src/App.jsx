import { useState, useEffect } from 'react'
import ItemCard from './components/ItemCard'

import './App.css'

function App() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    console.log('[api base url', import.meta.env.VITE_API_BASE_URL)
    fetch(`${import.meta.env.VITE_API_BASE_URL}/items`)
      .then(response => response.json()
      .then(items => setItems(items)))
  },[])

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

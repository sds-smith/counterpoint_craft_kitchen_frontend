import { useContext } from "react"
import { useParams } from "react-router-dom"
import ItemCard from "./ItemCard"
import { MenuContext } from "../context/MenuContext"

export default function Category() {
  const { category } = useParams();
  const { getMenuItemsByCategory } = useContext(MenuContext);

  const Category = getMenuItemsByCategory(category);

  const name = Category?.name || '';
  const items = Category?.items || [];

  return (
    <div>
      { Category
        ? <>
            <h1>{name}</h1>
            {items.map(item => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </>
        : <h1>Loading</h1>
      }
    </div>
  )
}

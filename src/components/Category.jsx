import { useContext } from "react"
import { useParams } from "react-router-dom"
import ItemCard from "./ItemCard"
import { MenuContext } from "../context/MenuContext"

export default function Category() {
    const { category } = useParams();
    const { getMenuItemsByCategory } = useContext(MenuContext);

    const Category = getMenuItemsByCategory(category);
    const {name, items} = Category
    console.log('[Category]',{Category})
    console.log('[Category]',{items})
  return (
    <div>
        <h1>{name}</h1>
        {items.map(item => (
            <ItemCard
                key={item.id}
                item={item}
            />
        ))}
    </div>
  )
}

import { useContext } from "react"
import { useParams } from "react-router-dom"
import Grid from "@mui/material/Grid2";
import ItemCard from "./ItemCard"
import { MenuContext } from "../context/MenuContext"

export default function Category() {
  const { category } = useParams();
  const { getMenuItemsByCategory } = useContext(MenuContext);

  const Category = getMenuItemsByCategory(category);

  const name = Category?.name || '';
  const items = Category?.items || [];

  return (
    <Grid container size={{xs: 12}} spacing={3}>
      { Category
        ? <>
            <Grid size={{xs: 12}}>
              <h1>{name}</h1>
            </Grid>
            {items.map(item => (
              <Grid key={item.id} size={{xs: 6, md: 3}} > 
                <ItemCard 
                  item={item}
                />
              </Grid>
            ))}
          </>
        : <h1>Loading</h1>
      }
    </Grid >
  )
}

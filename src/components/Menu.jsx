import { useContext } from "react";
import Grid from "@mui/material/Grid2";
import MenuButton from "./MenuButton";
import { MenuContext } from "../context/MenuContext";

const image = {
      url: '/src/assets/clay-banks-ZTtaJjiF_0M-unsplash.jpg',
      title: 'Camera',
      width: '30%',
    }

export default function Menu() {
    const { categories } = useContext(MenuContext);

    return (
        <Grid container size={{xs: 12}} spacing={3} sx={{paddingBottom: '100px'}}>
            <h1>Menu</h1>
            <Grid container size={{xs: 12}} sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            { categories?.map(category => (
                <MenuButton
                    key={category.id} 
                    image={image}
                    category={category}
                />
            ))}
            </Grid>
        </Grid>
    )
}

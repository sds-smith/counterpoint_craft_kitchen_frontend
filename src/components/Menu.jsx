import { useContext } from "react";
import Grid from "@mui/material/Grid2";
import PageWrapper from './PageWrapper';
import MenuButton from "./MenuButton";
import { MenuContext } from "../context/MenuContext";

export default function Menu() {
    const { menuLoading, categories } = useContext(MenuContext);

    return (
        <PageWrapper spacing={3} style={{paddingBottom: '100px'}}>
            { menuLoading
              ? <h1>Loading . . .</h1>
              : <>
                    <h1>Menu</h1>
                    <Grid container size={{xs: 12}} sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                    { categories?.map(category => (
                        <MenuButton
                            key={category.id} 
                            category={category}
                        />
                    ))}
                    </Grid>
                </>
            }
        </PageWrapper>
    )
}

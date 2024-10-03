
import { useNavigate } from "react-router-dom"
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button"
import StorefrontIcon from '@mui/icons-material/Storefront';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useCartStore } from "../store/store";

export default function Landing() {
    const { updateMethod } = useCartStore();
    const navigate = useNavigate();

    const handleClick = (method) => {
        updateMethod(method);
        navigate(`/order`)
    }

    return (
        <Grid container rowSpacing={40} size={{xs: 12}} className='landing'>
            <Grid size={{xs: 12}} ></Grid>
            <Grid container rowSpacing={6} size={{xs: 12}} justifyContent='center' >
                <Grid size={{xs: 1}}></Grid>
                <Grid size={{xs: 10}} >
                    <Button variant="contained" fullWidth startIcon={<StorefrontIcon />} onClick={() => handleClick('pickup')}>
                        Pick-up
                    </Button>
                </Grid>
                <Grid size={{xs: 1}}></Grid>
                <Grid size={{xs: 1}}></Grid>
                <Grid size={{xs: 10}} >
                    <Button variant="contained" fullWidth startIcon={<DeliveryDiningIcon />} onClick={() => handleClick('delivery')}>
                        Delivery
                    </Button>
                </Grid>
                <Grid size={{xs: 1}}></Grid>
            </Grid>
            <Grid size={{xs: 12}} ></Grid>
        </Grid>
    )
}



import Grid from "@mui/material/Grid2";

export default function PageWrapper(props) {
    const {children} = props
    const style = props.style || {};

    return (
        <Grid
            container 
            size={{xs: 12}}
            sx={{...style, marginTop: '50px'}}
            { ...props }
        >
            { children }
        </Grid>
    )
}

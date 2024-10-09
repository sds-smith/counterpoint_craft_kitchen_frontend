import { ReactNode } from "react";
import Grid from "@mui/material/Grid2";
import BreadCrumbs from "./BreadCrumbs";

type pageWrapperProps = {
    spacing?: number,
    rowSpacing?: number,
    className?: string,
    style?: {},
    children: ReactNode
}

export default function PageWrapper(props: pageWrapperProps) {
    const {children} = props
    const style = props.style || {};

    return (
        <Grid
            container 
            size={{xs: 12}}
            sx={{...style, marginTop: '50px'}}
            { ...props }
        >
            <BreadCrumbs />
            { children }
        </Grid>
    )
}

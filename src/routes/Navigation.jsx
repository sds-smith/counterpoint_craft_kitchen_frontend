
import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Navigation() {
  return (
    <Grid container >
      <Header />
      <Outlet />
      <Footer />
    </Grid>
  )
}

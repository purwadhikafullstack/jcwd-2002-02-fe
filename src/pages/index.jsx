import { Box, Container } from "@mui/material";
import Nav from "components/Nav/nav";
import UnggahResep from "components/UnggahResep/unggahResep";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";
import BannerJaminan from "components/BannerJaminan";
import Kategori from "components/Kategori";
import AdminSidebar from "components/AdminSidebar";

const Home = () => {
  return (
    <Box>
      <AdminSidebar />
      <Nav />
      <Container>
        <ProductCard />
        <UnggahResep />
        <Kategori />
        <BannerJaminan />
        <MetodePembayaran />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;

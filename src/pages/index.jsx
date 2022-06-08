import { Box, Container } from "@mui/material";
import Nav from "components/nav";
import UnggahResep from "components/unggahResep";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";
import BannerJaminan from "components/BannerJaminan";

const Home = () => {
  return (
    <Box>
      <Nav />
      <Container>
        <ProductCard />
        <UnggahResep />
        <BannerJaminan />
        <MetodePembayaran />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;

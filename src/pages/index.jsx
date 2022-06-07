import { Box, Button, Container, Typography } from "@mui/material";
import Nav from "components/nav";
import UnggahResep from "components/unggahResep";
import Footer from "components/Footer";
import MetodePembayaran from "components/MetodePembayaran";
import ProductCard from "components/ProductCard";

const Home = () => {
  return (
    <Box>
      <Nav />
      <Container>
        <Button variant="contain">hello world</Button>
        <Typography variant="h2">hello world</Typography>
        <ProductCard />
        <UnggahResep />
        <MetodePembayaran />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;

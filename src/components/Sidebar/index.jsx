/* eslint-disable no-unused-vars */
import {
  Box,
  Collapse,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

const Sidebar = ({
  setHargaMinimum,
  setHargaMaksimum,
  setPage,
  setKategoriTerpilih,
}) => {
  const [kategori, setKategori] = useState(false);
  const openKategori = () => setKategori(true);
  const closeKategori = () => setKategori(false);
  const [harga, setHarga] = useState(false);
  const openHarga = () => setHarga(true);
  const closeHarga = () => setHarga(false);
  const [hargaMin, setHargaMin] = useState(null);
  const [hargaMaks, setHargaMaks] = useState(null);
  const [pilihKategori, setPilihKategori] = useState(null);

  const kategoriHandler = (value) => {
    setPilihKategori(value);
    setKategoriTerpilih(value);
    setPage(1);
  };

  const setHandler = () => {
    setHargaMinimum(hargaMin);
    setHargaMaksimum(hargaMaks);
    setPage(1);
  };
  return (
    <Box display="flex" flexDirection={{ xs: "row", md: "column" }}>
      <Stack
        sx={{
          maxWidth: "300px",
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          mb: "32px",
          display: "flex",
          minHeight: "75px",
        }}
        flexDirection={{ xs: "row", md: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: "16px", color: "Brand.500" }}
          >
            KATEGORI
          </Typography>
          {!kategori ? (
            <KeyboardArrowDownIcon
              onClick={openKategori}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={closeKategori}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </Box>
        <Collapse in={kategori}>
          <Stack sx={{ mt: "16px" }}>
            <Typography
              onClick={() => kategoriHandler(1)}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Obat-Obatan
            </Typography>
            <Typography
              onClick={() => kategoriHandler(2)}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Nutrisi
            </Typography>
            <Typography
              value={3}
              onClick={kategoriHandler}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Herbal
            </Typography>
            <Typography
              value={4}
              onClick={kategoriHandler}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Vitamin & Suplemen
            </Typography>
            <Typography
              value={5}
              onClick={kategoriHandler}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Alat Kesehatan
            </Typography>
            <Typography
              value={6}
              onClick={kategoriHandler}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Perawatan Tubuh
            </Typography>
            <Typography
              value={7}
              onClick={kategoriHandler}
              sx={{
                fontSize: "14px",
                mb: "12px",
                "&:hover": {
                  cursor: "pointer",
                  color: "Brand.500",
                  fontWeight: 700,
                },
              }}
            >
              Ibu & Anak
            </Typography>
          </Stack>
        </Collapse>
      </Stack>
      <Stack
        sx={{
          maxWidth: "300px",
          paddingX: "28px",
          paddingY: "29px",
          border: "1px solid white",
          borderRadius: 3,
          boxShadow: "0 0 15px -10px black",
          minHeight: "75px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontWeight: 700, fontSize: "16px", color: "Brand.500" }}
          >
            HARGA
          </Typography>
          {!harga ? (
            <KeyboardArrowDownIcon
              onClick={openHarga}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          ) : (
            <KeyboardArrowUpIcon
              onClick={closeHarga}
              sx={{
                fontWeight: 700,
                fontSize: "25px",
                color: "#213360",
                "&:hover": { cursor: "pointer" },
              }}
            />
          )}
        </Box>
        <Collapse in={harga}>
          <FormControl variant="outlined" sx={{ mt: "16px" }}>
            <TextField
              onChange={(e) => setHargaMin(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              label="Harga Minimum"
            />
          </FormControl>
          <FormControl variant="outlined" sx={{ mt: "16px" }}>
            <TextField
              onChange={(e) => setHargaMaks(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              }}
              label="Harga Maksimum"
            />
          </FormControl>
          <Button
            fullWidth
            onClick={setHandler}
            variant="contained"
            sx={{ "&:hover": { border: 0 }, mt: 2 }}
          >
            SET
          </Button>
        </Collapse>
      </Stack>
    </Box>
  );
};
export default Sidebar;

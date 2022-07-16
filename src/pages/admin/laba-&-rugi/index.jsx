import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  FormLabel,
  TextField,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import requiresAdmin from "config/requireAdmin";
import moment from "moment";
import IncomeStatement from "components/Admin/IncomeStatement";

const LabaDanRugiPage = () => {
  const [periode, setPeriode] = useState("Bulanan");
  const [bulan, setBulan] = useState(1);
  const [tahun, setTahun] = useState("2022");

  const periodeHandle = (event) => {
    setPeriode(event.target.value);
  };
  const bulanHandle = (event) => {
    setBulan(event.target.value);
  };
  const tahunHandle = (event) => {
    setTahun(event);
  };

  console.log(bulan);
  return (
    <Grid container>
      {/* Heading Box */}
      <Grid item xs={12} marginBottom="32px">
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
              Laporan Laba & Rugi
            </Typography>
            <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
              Update terakhir:{" "}
              <Typography
                component="span"
                sx={{ fontSize: "14px", fontWeight: "bold" }}
              >
                20 Januari 2022, 14.30 WIB
              </Typography>
            </Typography>
          </Box>
          <Box display="flex">
            <Button
              sx={{ marginRight: "15px" }}
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Unduh PDF
            </Button>
            <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
              Excel
            </Button>
          </Box>
        </Box>
        <Divider orientation="horizontal" sx={{ marginTop: "40px" }} />
      </Grid>

      {/* Filter Box */}
      <Grid item xs={12} marginBottom="16px">
        {/* Box Filter */}
        <Box display="flex" flexDirection="row">
          <FormControl sx={{ marginRight: "16px" }}>
            <FormLabel>Periode</FormLabel>
            <Select
              sx={{
                borderRadius: "10px",
                minWidth: "156px",
                height: "42px",
                backgroundColor: "white",
              }}
              onChange={periodeHandle}
              value={periode}
              displayEmpty
              autoWidth
            >
              <MenuItem value="Bulanan">Bulanan</MenuItem>
              <MenuItem value="Tahunan">Tahunan</MenuItem>
            </Select>
          </FormControl>
          {/* Filter Obat */}
          <FormControl sx={{ marginRight: "16px" }}>
            <FormLabel>Bulan</FormLabel>
            <Select
              sx={{
                borderRadius: "10px",
                minWidth: "156px",
                height: "42px",
                backgroundColor: "white",
              }}
              onChange={bulanHandle}
              value={bulan}
              displayEmpty
              autoWidth
            >
              <MenuItem value={1}>Januari</MenuItem>
              <MenuItem value={2}>Februari</MenuItem>
              <MenuItem value={3}>Maret</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>Mei</MenuItem>
              <MenuItem value={6}>Juni</MenuItem>
              <MenuItem value={7}>Juli</MenuItem>
              <MenuItem value={8}>Agustus</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>Oktober</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>Desember</MenuItem>
            </Select>
          </FormControl>

          {/* Filter Urutkan */}
          <FormControl>
            <FormLabel>Tahun</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                views={["year"]}
                value={tahun}
                onChange={tahunHandle}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "10px",
                      width: "auto",
                    }}
                    {...params}
                    helperText={null}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </Grid>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "32px 27px",
          width: "100%",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Laporan Laba & Rugi
        </Typography>
        <Typography textAlign="center">
          Periode Bulan {moment(bulan).format("MMMM")} Tahun{" "}
          {moment(tahun).format("YYYY")}
        </Typography>
        <Typography textAlign="center">
          Terbit: Minggu 13 Februari, 2022 pukul 18.14 (GMT +07.00)
        </Typography>
        <Box marginTop="20px">
          <IncomeStatement
            title1="Penjualan"
            title2="dalam rupiah"
            kategori={[
              { kategoriName: "Penjualan Barang", value: 25000000 },
              { kategoriName: "Total Service", value: 15000 },
              { kategoriName: "Total Embalance", value: 0 },
              { kategoriName: "Ongkos Kirim", value: 23000 },
              { kategoriName: "Diskon Penjualan", value: 3000000 },
              { kategoriName: "Retur Penjualan", value: 25000 },
            ]}
            footer="Penjualan Bersih"
            footerValue="70.000.000"
          />
          <IncomeStatement
            title1="Harga Pokok Penjualan"
            kategori={[
              { kategoriName: "Persediaan Awal", value: "68.000.000" },
              { kategoriName: "Pembelian Kotor", value: "61.000.000" },
              { kategoriName: "Retur Pembelian Kotor", value: 0 },
              { kategoriName: "Mutasi Barang Masuk", value: 0 },
              { kategoriName: "Mutasi Barang Keluar", value: 0 },
              { kategoriName: "Persediaan Akhir", value: "70.000.000" },
            ]}
            footer="Harga Pokok Penjualan"
            footerValue="59.000.000"
          />
          <IncomeStatement
            title1="Pengeluaran Operasional"
            kategori={[
              { kategoriName: "Gaji Karyawan", value: 0 },
              { kategoriName: "Listrik", value: 0 },
              { kategoriName: "Air", value: 0 },
              { kategoriName: "Telepon", value: 0 },
              { kategoriName: "Internet", value: 0 },
              { kategoriName: "Sewa Tempat", value: 0 },
              { kategoriName: "Peralatan Kantor", value: 0 },
              { kategoriName: "Biaya Pengadaan", value: 0 },
              { kategoriName: "Biaya Operasional Lainnya", value: "96.173" },
            ]}
            footer="Pengeluaran Operasional"
            footerValue="96.173"
          />
          <IncomeStatement
            title1="Pendapatan Lainnya"
            kategori={[
              { kategoriName: "Cashback Pembelian", value: "177.939" },
              { kategoriName: "Keuntungan Konsiyasi", value: 0 },
            ]}
            footer="Pendapatan Lainnya"
            footerValue="177.939"
          />
          <IncomeStatement
            title1="Laba Bersih"
            kategori={[
              { kategoriName: "Laba Kotor", value: "20.007.753" },
              { kategoriName: "Pengeluaran Operasional", value: "96.173" },
              { kategoriName: "Pendapatan Lainnya", value: "177.939" },
            ]}
            footer="Laba Bersih"
            footerValue="20.089.519"
          />
        </Box>
      </Box>
    </Grid>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default LabaDanRugiPage;

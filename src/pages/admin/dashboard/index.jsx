/* eslint-disable react/jsx-no-useless-fragment */
import {
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CardCategory from "components/Admin/CardCategory";
import CardWithCircularBar from "components/Admin/CardWithCircularBar";
import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const DashboardPage = () => {
  const penjualanObatOption = {
    stroke: { width: 2, curve: "smooth" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Des",
      ],
    },
  };

  const penjualanObatSeries = [
    {
      name: "Obat Bebas",
      data: [750, 800, 850, 500, 300, 400, 100, 700, 550, 1200, 850, 300],
    },
    {
      name: "Obat Racikan",
      data: [300, 200, 450, 500, 600, 550, 700, 770, 600, 800, 1250, 100],
    },
  ];

  const profitOption = {
    xaxis: {
      categories: [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
        "Minggu",
      ],
    },
  };

  const profitSeries = [
    {
      name: "series-1",
      data: [3, 5, 6, 4, 8, 7, 9],
    },
  ];

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Grid container>
      {/* Container 1 */}
      <Grid container sx={{ marginBottom: "32px" }}>
        <Grid item>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Analisis Produk & Toko
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

          <Grid container spacing={2}>
            <CardWithCircularBar
              title="Profit Hari Ini"
              amount="Rp 10.000.000"
              value="+5.700.000"
              percentage={25}
              notation="+"
            />
            <CardWithCircularBar
              title="Total Pemesanan Hari Ini"
              amount="110"
              value="-60"
              percentage={62}
              notation="-"
            />
            <CardWithCircularBar
              title="Sisa Hari Ini"
              amount="110"
              value="+30"
              percentage={30}
              notation="+"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Container 2 */}
      <Grid container spacing={2} sx={{ marginBottom: "32px" }}>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Penting Hari Ini
          </Typography>
          <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
            Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan pelanggan
          </Typography>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <CardCategory title="Pesanan Baru" value={7} />
            <CardCategory title="Siap Dikirim" value={3} />
            <CardCategory title="Sedang Dikirim" value={0} />
            <CardCategory title="Selesai" value={7} />
            <CardCategory title="Dibatalkan" value={3} />
            <CardCategory title="Chat Baru" value={0} />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Kedaluwarsa Obat
          </Typography>
          <Typography sx={{ color: "Sidebar.500", fontSize: "14px" }}>
            Cek tanggal kedaluwarsa untuk mengorganisir stok obat
          </Typography>
          <Grid
            xs={7}
            item
            sx={{ marginRight: "16px", marginTop: "16px", maxHeight: "198px" }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                paddingX: "16px",
                paddingY: "38px",
                boxShadow: 2,
                borderRadius: "5px",
                maxHeight: "198px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Telah Kadaluwarsa
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px", color: "red" }}
                >
                  17
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Kadaluwarse Bulan Ini
                </Typography>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "24px", color: "yellow" }}
                >
                  0
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Kadaluwarsa 3 Bulan Ke Depan
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#21CDC0",
                  }}
                >
                  3
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Container 3 Graph */}
      <Grid container alignItems="stretch" spacing={2}>
        {/* Statistik Profit */}
        <Grid item xs={6}>
          <Box
            sx={{
              paddingX: "16px",
              paddingY: "32px",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Profit
                </Typography>
                <Typography sx={{ fontSize: "12px", color: "Sidebar.500" }}>
                  Data dinyatakan dalam jutaan rupiah
                </Typography>
              </Box>
              <FormControl>
                <Select
                  sx={{ width: "141px", height: "24px" }}
                  onChange={handleChange}
                  value={sort}
                >
                  <MenuItem value="Mingguan">Mingguan</MenuItem>
                  <MenuItem value="Bulanan">Bulanan</MenuItem>
                  <MenuItem value="Tahunan">Tahunan</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Chart type="bar" options={profitOption} series={profitSeries} />
          </Box>
        </Grid>

        {/* Statistik Penjualan Obat */}
        <Grid item xs={6}>
          <Box
            sx={{
              paddingX: "16px",
              paddingY: "32px",
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                Penjualan Obat
              </Typography>
              <FormControl>
                <Select
                  sx={{ width: "141px", height: "24px" }}
                  onChange={handleChange}
                  value={sort}
                >
                  <MenuItem value="Mingguan">Mingguan</MenuItem>
                  <MenuItem value="Bulanan">Bulanan</MenuItem>
                  <MenuItem value="Tahunan">Tahunan</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Chart
              type="line"
              options={penjualanObatOption}
              series={penjualanObatSeries}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;

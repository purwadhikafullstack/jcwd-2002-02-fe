import {
  Box,
  Button,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import moment from "moment";
import _ from "lodash";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DataTable from "components/admin_components/table";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "tanggal", headerName: "Tanggal", width: 130 },
  { field: "aktifitas", headerName: "Aktifitas", width: 200, sortable: false },
  {
    field: "petugas",
    headerName: "Petugas",
    sortable: false,
    width: 130,
  },
  {
    field: "keluar",
    headerName: "Keluar",
    width: 90,
    type: "number",
  },
  { field: "masuk", headerName: "Masuk", width: 90, type: "number" },
  { field: "sisa", headerName: "Sisa", width: 90, type: "number" },
  { field: "tglKadaluarsa", headerName: "Tgl.Kadaluwarsa", width: 130 },
];

const rows = [
  {
    id: 1,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penerimaan Barang",
    petugas: "Mike",
    keluar: 10,
    masuk: 20,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 2,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Yuyu",
    keluar: 20,
    masuk: 30,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 3,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Jer",
    keluar: 50,
    masuk: 50,
    sisa: 0,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
  {
    id: 4,
    tanggal: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
    aktifitas: "Penjualan Barang",
    petugas: "Yuyu",
    keluar: 20,
    masuk: 30,
    sisa: 10,
    tglKadaluarsa: moment("2022-04-05 07:25:48").format("DD MMMM YYYY"),
  },
];

const KartuStok = () => {
  const [namaObatFilter, setNamaObatFilter] = useState("");
  const [dateRange, setDateRange] = useState();

  const router = useRouter();

  const debounceNamaObatFilter = useCallback(
    _.debounce((values) => {
      setNamaObatFilter(values);
    }, 2000),
    []
  );

  const debounceDateRangeInput = useCallback(
    _.debounce((date) => {
      setDateRange(date.selection);
    }, 2000),
    []
  );

  useEffect(() => {
    if (namaObatFilter) {
      router.push({
        query: {
          nama_obat: namaObatFilter,
        },
      });
    }
  }, [namaObatFilter]);

  useEffect(() => {
    if (router.isReady) {
      if (router.query.nama_obat) {
        setNamaObatFilter(router.query.nama_obat);
      }
    }
  }, [router.isReady]);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  return (
    <Box paddingTop="38px" width="1186px" height="100%" paddingX="48px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Buku Kas
        </Typography>
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
      <Box
        paddingLeft="32px"
        paddingY="32px"
        width="100%"
        height="772px"
        marginTop="38px"
        marginBottom="94px"
        borderRadius="8px"
        boxShadow="2"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          marginBottom="35px"
          marginRight="32px"
        >
          <Box
            display="flex"
            flexDirection="column"
            // marginLeft="32px"
            // mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Akun Kas</Typography>
            <Typography>BCA xxxxxxxxxxxx</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            // marginLeft="32px"
            // mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Tanggal</Typography>
            <DateRangePicker
              ranges={[selectionRange]}
              showMonthAndYearPickers={false}
              onChange={(date) => debounceDateRangeInput(date)}
            />
          </Box>
          <OutlinedInput
            onChange={(e) => debounceNamaObatFilter(e.target.value)}
            placeholder="Cari nama obat"
            sx={{ width: "328px", height: "42px" }}
            endAdornment={
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
        <Divider />
        <Box
          sx={{
            height: 400,
            width: "100%",
            marginTop: "32px",
          }}
        >
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Box>
    </Box>
  );
};

export default KartuStok;

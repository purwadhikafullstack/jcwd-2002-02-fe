import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  // InputAdornment,
  // OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import DataTable from "components/admin_components/table";
import moment from "moment";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const columns = [
  { field: "id", headerName: "No", width: 70 },
  { field: "tanggal", headerName: "Tanggal", width: 130 },
  { field: "aktifitas", headerName: "Aktifitas", width: 350, sortable: false },
  {
    field: "masuk",
    headerName: "Masuk (Rp.)",
    width: 120,
    type: "number",
  },
  {
    field: "keluar",
    headerName: "Keluar (Rp.)",
    width: 120,
    type: "number",
  },
  { field: "saldo", headerName: "Saldo", width: 120, type: "number" },
  {
    field: "atur",
    headerName: "Atur",
    width: 130,
    renderCell: () => {
      return <Button variant="outlined">Batalkan</Button>;
    },
  },
];

const autoCompleteSelectionMonth = [
  {
    label: "January",
  },
  {
    label: "February",
  },
  {
    label: "March",
  },
  {
    label: "April",
  },
  {
    label: "Mei",
  },
  {
    label: "June",
  },
  {
    label: "July",
  },
  {
    label: "August",
  },
  {
    label: "September",
  },
  {
    label: "October",
  },
  {
    label: "November",
  },
  {
    label: "December",
  },
];

const autoCompleteSelectionYear = [];

const rows = [
  {
    id: 1,
    tanggal: moment("2022-04-05 07:25:48").format("DD/MM/YYYY"),
    aktifitas: "Penjualan dengan nomer faktur:  220103412531",
    masuk: 8000000,
    keluar: 8000000,
    saldo: 68000000,
  },
];

const KartuStok = () => {
  return (
    // <Box width="1186px" boxShadow={2}>
    //   <Box width="100%" paddingLeft="30px">

    //   </Box>
    // </Box>

    <Box
      height="100vh"
      sx={{
        backgroundColor: "#D6F5F3",
      }}
    >
      <Box
        height="64px"
        display="flex"
        alignItems="center"
        paddingX="20px"
        paddingRight="40px"
        paddingLeft="40px"
        justifyContent="space-between"
        boxShadow={1}
        sx={{ backgroundColor: "#FFFFFF" }}
      >
        <Box display="flex" alignItems="center">
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography marginLeft="25px" fontWeight="bold" variant="h6">
            Detail Obat: Actived
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{ width: "105px", height: "40px" }}
          startIcon={<InsertDriveFileIcon />}
        >
          Excel
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
        }}
        marginX="48px"
        marginTop="60px"
        marginBottom="124px"
        borderRadius="16px"
        paddingBottom="40px"
      >
        <Box display="flex">
          <Box
            display="flex"
            flexDirection="column"
            marginLeft="32px"
            mt="30px"
            mr="24px"
          >
            <Typography sx={{ mb: "5px" }}>Bulan</Typography>
            <Autocomplete
              disablePortal
              options={autoCompleteSelectionMonth}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "200px" }} />
              )}
            />
          </Box>
          <Box display="flex" flexDirection="column" mt="30px" mr="24px">
            <Typography sx={{ mb: "5px" }}>Tahun</Typography>
            <Autocomplete
              disablePortal
              options={autoCompleteSelectionYear}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "200px" }} />
              )}
            />
          </Box>
        </Box>
        <Divider
          sx={{
            marginY: "30px",
          }}
        />
        <Box
          marginTop="32px"
          // marginBottom="39px"
          marginX="86px"
          sx={{
            height: 400,
            // width: "100%",
          }}
        >
          <DataTable columns={columns} rows={rows} />
        </Box>
      </Box>
    </Box>
  );
};

export default KartuStok;

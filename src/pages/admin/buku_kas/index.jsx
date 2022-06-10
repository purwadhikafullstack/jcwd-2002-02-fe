import { Box } from "@mui/material";
import DataTable from "components/admin_components/table";
import moment from "moment";

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
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataTable columns={columns} rows={rows} />
    </Box>
  );
};

export default KartuStok;

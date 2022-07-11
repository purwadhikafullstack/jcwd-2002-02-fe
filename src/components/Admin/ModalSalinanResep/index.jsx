import {
  Modal,
  Typography,
  Box,
  Divider,
  Button,
  Grid,
  FormControl,
  FormLabel,
  OutlinedInput,
  Tabs,
  Tab,
  MenuItem,
  Select,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  styled,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import Image from "next/image";
import Group8725 from "public/Images/Group8725.png";
import Kursiplastik from "public/Images/kursiplastik.png";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axiosInstance from "config/api";
import { useFormik } from "formik";

const ModalSalinanResep = ({
  open,
  handleClose,
  namaPembeli,
  namaProduk,
  kodeOrder,
  waktuOrder,
  hargaProduk,
  hargaTotal,
  jumlahProduk,
}) => {
  const [terimaPesanan, setTerimaPesanan] = useState(false);
  const [selesai, setSelesai] = useState(false);
  const [productData, setProductData] = useState([]);
  const [listObat, setListObat] = useState([]);

  const isTerima = () => {
    setTerimaPesanan(true);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      align: "center",
    },
  }));

  const fetchProduct = async () => {
    try {
      const res = await axiosInstance.get("/admin/product");
      setProductData(res?.data?.result?.rows);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      namaPasien: "",
      namaDokter: "",
      obat: "",
      kuantitas: 0,
      satuan: "Box",
    },
    validationSchema: Yup.object().shape({
      namaPasien: Yup.string().required(),
      namaDokter: Yup.string().required(),
      obat: Yup.number().required(),
      kuantitas: Yup.number().min(1),
      satuan: Yup.string(),
    }),
    validateOnChange: true,
  });

  useEffect(() => {
    if (!productData.length) {
      fetchProduct();
    }
  }, []);

  return (
    <Modal open={open} onClose={handleClose}>
      {terimaPesanan ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "480px",
            height: "412px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box display="flex" justifyContent="flex-end">
            <CloseIcon
              onClick={handleClose}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group8725} />
            <Typography
              sx={{
                marginTop: "20px",
                fontSize: "16px",
                color: "Brand.500",
                fontWeight: "bold",
              }}
            >
              Pesanan Berhasil Diproses
            </Typography>
            <Typography sx={{ color: "Brand.300", fontSize: "12px" }}>
              Silahkan ajukan pengambilan barang di halaman pengiriman
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            maxHeight: "700px",
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Box Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            marginBottom="30px"
          >
            <Typography fontSize="20px" fontWeight="bold">
              Buat Salinan Resep
            </Typography>
            <CloseIcon
              onClick={handleClose}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
          {/* Box for Content */}
          <Box overflow="auto">
            <Grid container spacing={3}>
              {/* Grid for Image */}
              <Grid item xs={5}>
                <Image src={Kursiplastik} />
              </Grid>
              <Grid item xs={7}>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      No. Pemesanan
                    </Typography>
                    <Typography fontSize="20px" fontWeight="100">
                      {kodeOrder}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Tgl. Pemesanan
                    </Typography>
                    <Typography fontSize="20px" fontWeight="100">
                      {waktuOrder}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.namaPasien}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Pasien
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="Masukkan nama pasien"
                        sx={{ width: "300px" }}
                        value={formik.values.namaPasien}
                        onChange={(e) =>
                          formik.setFieldValue("namaPasien", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2} marginBottom="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.namaDokter}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Dokter
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="Masukkan nama dokter"
                        sx={{ width: "300px" }}
                        value={formik.values.namaDokter}
                        onChange={(e) =>
                          formik.setFieldValue("namaDokter", e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Divider />
                <Tabs indicatorColor="primary" value={1}>
                  <Tab
                    value={1}
                    sx={{ textTransform: "capitalize" }}
                    label="Tambah Obat Bebas"
                  />
                </Tabs>
                <Grid container spacing={2} marginY="16px">
                  <Grid item xs={12}>
                    <FormControl error={formik.errors.obat}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Nama Obat
                      </FormLabel>
                      <Select
                        onChange={(e) =>
                          formik.setFieldValue("obat", e.target.value)
                        }
                        value={formik.values.obat}
                        size="small"
                        displayEmpty
                        sx={{ width: "336px" }}
                      >
                        <MenuItem disabled value="">
                          Masukkan Nama Obat
                        </MenuItem>
                        {productData.map((val) => {
                          return (
                            <MenuItem value={val.id}>
                              {val.nama_produk}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={1} marginBottom="16px">
                  <Grid item xs={4}>
                    <FormControl error={formik.errors.kuantitas}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Kuantitas
                      </FormLabel>
                      <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                      >
                        <RemoveIcon
                          fontSize="large"
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => {
                            if (formik.values.kuantitas < 1) {
                              formik.setFieldValue("kuantitas", 0);
                            } else {
                              formik.setFieldValue(
                                "kuantitas",
                                formik.values.kuantitas - 1
                              );
                            }
                          }}
                        />
                        <Typography
                          fontSize="30px"
                          fontWeight="bold"
                          marginX="15px"
                        >
                          {formik.values.kuantitas}
                        </Typography>
                        <AddIcon
                          fontSize="large"
                          sx={{
                            color: "Sidebar.500",
                            ":hover": { color: "Brand.500", cursor: "pointer" },
                          }}
                          onClick={() => {
                            formik.setFieldValue(
                              "kuantitas",
                              formik.values.kuantitas + 1
                            );
                          }}
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl error={formik.errors.satuan}>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Satuan
                      </FormLabel>
                      <Select
                        size="small"
                        sx={{
                          backgroundColor: "white",
                          width: "200px",
                        }}
                        onChange={(e) =>
                          formik.setFieldValue("satuan", e.target.value)
                        }
                        value={formik.values.satuan}
                        displayEmpty
                        defaultValue="Box"
                      >
                        <MenuItem value="Box">Box</MenuItem>
                        <MenuItem value="Strip">Strip</MenuItem>
                        <MenuItem value="Botol">Botol</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <FormLabel
                        sx={{
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Dosis
                      </FormLabel>
                      <OutlinedInput
                        size="small"
                        placeholder="cth. 3 x 1"
                        sx={{ width: "100%" }}
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Box Tambah Obat */}
                <Box display="flex" justifyContent="flex-end" marginY={2}>
                  <Button
                    variant="contained"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    Tambahkan Obat
                  </Button>
                </Box>
                <Divider />

                {/* Grid for Table */}
                <Grid container flexDirection="column" marginTop="10px">
                  <Typography fontWeight="bold" marginBottom="18px">
                    Ringkasan Resep
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table aria-label="customized table" stickyHeader>
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>No</StyledTableCell>
                          <StyledTableCell>Nama Obat</StyledTableCell>
                          <StyledTableCell>Kategori</StyledTableCell>
                          <StyledTableCell>Kuantitas</StyledTableCell>
                          <StyledTableCell>Satuan</StyledTableCell>
                          <StyledTableCell>Dosis</StyledTableCell>
                          <StyledTableCell>Atur</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            ":nth-of-type(even)": {
                              backgroundColor: "#D3D3D3",
                            },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            1
                          </TableCell>
                          <TableCell align="center">Vitamin B</TableCell>
                          <TableCell align="center">Obat Bebas</TableCell>
                          <TableCell align="center">2</TableCell>
                          <TableCell align="center">Stip</TableCell>
                          <TableCell align="center">2x1</TableCell>
                          <TableCell align="center">Oke</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Box for Button */}
          <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button
              onClick={() => setSelesai(true)}
              variant="contained"
              disabled={!listObat.length}
            >
              Selesai
            </Button>
          </Box>
          {/* Ringkasan Resep */}
          <Modal open={selesai} onClose={() => setSelesai(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "792px",
                height: "auto",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Box 1 */}
              <Box sx={{ p: 3 }}>
                <Box display="flex" justifyContent="flex-end">
                  <CloseIcon
                    onClick={() => setSelesai(false)}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>

                <Typography
                  textAlign="center"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  Ringkasan Resep
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  marginTop="30px"
                  marginBottom="10px"
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                    {namaPembeli}
                  </Typography>
                  <Typography
                    sx={{
                      color: "Sidebar.700",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    /
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {kodeOrder}
                  </Typography>
                  <Typography
                    sx={{
                      color: "Sidebar.700",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    /
                  </Typography>

                  <Typography
                    sx={{
                      color: "gray",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {waktuOrder}
                  </Typography>
                </Box>

                {/* Box List Obat */}
                <Box marginBottom="5px">
                  <Typography fontSize="14px" fontWeight="bold">
                    {namaProduk}
                  </Typography>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        Obat Bebas
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        {jumlahProduk} x {hargaProduk}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        Strip
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        {jumlahProduk} x 1
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                {/* Box List Obat 2 */}
                <Box>
                  <Typography fontSize="14px" fontWeight="bold">
                    Obat Demam
                  </Typography>
                  <Grid container>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        Obat Racikan
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        2 x 8.500
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        Serbuk
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography sx={{ fontSize: "12px", color: "gray" }}>
                        2 x 1
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>

              {/* Box 2 */}
              <Box>
                {/* Total Harga */}
                <Box sx={{ p: 3 }}>
                  <Box
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "#faf0e8",
                      padding: "8px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          marginRight: "8px",
                        }}
                      >
                        Total Harga
                      </Typography>
                      <Typography sx={{ fontSize: "10px", fontWeight: "bold" }}>
                        ({jumlahProduk} Obat)
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        marginRight: "8px",
                      }}
                    >
                      Rp {hargaTotal},-
                    </Typography>
                  </Box>
                </Box>
                <Divider orientation="horizontal" />
                <Box display="flex" justifyContent="flex-end" padding="16px">
                  <Button onClick={isTerima} variant="contained">
                    Terima Pesanan
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Modal>
  );
};

export default ModalSalinanResep;

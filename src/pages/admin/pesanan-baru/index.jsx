/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Grid,
  Box,
  Typography,
  Button,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Pagination,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Image from "next/image";
import CardOrder from "components/Admin/CardOrder";
import Group from "public/Images/Group.png";
import requiresAdmin from "config/requireAdmin";
import axiosInstance from "config/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

const PesananBaruPage = () => {
  const router = useRouter();
  const [order, setOrder] = useState([1]);
  const [sortFilter, setSortFilter] = useState("");
  const [urutkan, setUrutkan] = useState("");
  const [cardPerPage, setCardPerPage] = useState("5");
  const [transaksi, setTransaksi] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [sortBy, setSortBy] = useState(router.query._sortBy);
  const [sortDir, setSortDir] = useState(router.query._sortDir);

  const filterHandle = (event) => {
    setSortFilter(event.target.value);
  };

  const urutkanHandle = (event) => {
    setUrutkan(event.target.value);
  };

  const cardHandle = (event) => {
    setCardPerPage(event.target.value);
  };

  const fetchTransaksi = async () => {
    const limit = 5;
    try {
      const dataTransaksi = await axiosInstance.get("/transaction", {
        params: {
          statusTerpilih: 1,
          _page: page,
          _sortBy: sortBy ? sortBy : undefined,
          _sortDir: sortDir ? sortDir : undefined,
          _limit: limit,
        },
      });
      if (page == 1) {
        setTransaksi(dataTransaksi.data.result.rows);
      } else {
        setTransaksi((prevTransaction) => [
          ...prevTransaction,
          ...dataTransaksi.data.result.rows,
        ]);
      }
      setMaxPage(Math.ceil(dataTransaksi.data.result.count / limit));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      if (router.query._sortBy) {
        setSortBy(router.query._sortBy);
      }
      if (router.query._sortDir) {
        setSortDir(router.query.sortDir);
      }
    }
  }, [router.isReady]);

  const sortButton = () => {
    if (urutkan == "Terbaru") {
      setSortBy("createdAt");
      setSortDir("DESC");
    } else if (urutkan == "Terlama") {
      setSortBy("createdAt");
      setSortDir("ASC");
    }
    setPage(1);
  };

  const fetchNextPage = () => {
    setPage(page + 1);
  };

  const renderTransaksi = () => {
    return transaksi?.map((val) => {
      return (
        <CardOrder
          buyersName={val?.user?.username}
          buyersAddress={val?.address?.alamat_lengkap}
          totalPrice={val?.total_price}
          productImage={
            val?.resep_image_url ||
            val?.transaction_details[0]?.product?.produk_image_url[0]
          }
          productName={
            val?.nomor_resep ||
            val?.transaction_details[0]?.product?.nama_produk
          }
          product={val?.transaction_details}
          productQty={val?.transaction_details[0]?.quantity}
          productPrice={val?.transaction_details[0]?.price_when_sold}
          courier="JNE-REG"
          orderCode={`HTMED-${val.id}`}
          status={val?.paymentStatusId}
          transaksiId={val?.id}
          isObatResep={val?.is_resep}
        />
      );
    });
  };

  useEffect(() => {
    fetchTransaksi();
    if (typeof sortDir === "string") {
      router.push({
        query: {
          _sortBy: sortBy,
          _sortDir: sortDir,
        },
      });
    }
  }, [page, sortBy, sortDir]);

  const sortDefaultValue = () => {
    if (router.isReady && router.query._sortDir && router.query._sortBy) {
      if (
        router.query._sortDir === "DESC" &&
        router.query._sortBy === "createdAt"
      ) {
        return "Terbaru";
      }
      if (
        router.query._sortDir === "ASC" &&
        router.query._sortBy === "createdAt"
      ) {
        return "Terlama";
      }
    }
    return "";
  };

  return (
    <>
      {order.length ? (
        <Grid container>
          {/* Heading Box */}
          <Grid item xs={12} marginBottom="32px">
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  Pesanan Baru
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
              <OutlinedInput
                sx={{
                  borderRadius: "10px",
                  width: "328px",
                  height: "42px",
                  backgroundColor: "white",
                  marginRight: "16px",
                }}
                placeholder="Cari nama obat"
                endAdornment={<SearchIcon htmlColor="gray" />}
              />
              {/* Filter Obat */}
              <FormControl sx={{ marginRight: "16px" }}>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={filterHandle}
                  value={sortFilter}
                  displayEmpty
                  autoWidth
                >
                  <MenuItem disabled value="">
                    Filter
                  </MenuItem>
                  <MenuItem value="Obat Bebas">Obat Bebas</MenuItem>
                  <MenuItem value="Obat Resep">Obat Resep</MenuItem>
                </Select>
              </FormControl>

              {/* Filter Urutkan */}
              <FormControl>
                <Select
                  sx={{
                    borderRadius: "10px",
                    minWidth: "156px",
                    height: "42px",
                    backgroundColor: "white",
                  }}
                  onChange={urutkanHandle}
                  value={urutkan}
                  autoWidth
                  displayEmpty
                  defaultValue={sortDefaultValue()}
                >
                  <MenuItem value="" disabled>
                    Urutkan
                  </MenuItem>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                  <MenuItem value="Terlama">Terlama</MenuItem>
                </Select>
              </FormControl>
              <Button onClick={sortButton}>Urutkan</Button>
            </Box>
          </Grid>

          {/* Body Box */}
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              <Box display="flex" flexDirection="row" alignContent="center">
                <Typography sx={{ marginRight: "5px" }}>
                  Kartu per halaman
                </Typography>
                <FormControl sx={{ marginRight: "30px" }}>
                  <Select
                    sx={{
                      borderRadius: "5px",
                      minWidth: "68px",
                      height: "28px",
                      backgroundColor: "white",
                      borderColor: "Brand.500",
                    }}
                    onChange={cardHandle}
                    value={cardPerPage}
                    autoWidth
                    displayEmpty
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </FormControl>
                <Stack spacing={2}>
                  <Pagination count={10} color="primary" siblingCount={0} />
                </Stack>
              </Box>
            </Box>
            <InfiniteScroll
              dataLength={transaksi.length}
              next={fetchNextPage}
              hasMore={page < maxPage}
              loader={<Typography>Loading...</Typography>}
            >
              {renderTransaksi()}
            </InfiniteScroll>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Pesanan Baru
          </Typography>
          <Divider orientation="horizontal" sx={{ marginY: "40px" }} />
          <Box
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={Group} />
            <Typography
              sx={{ marginTop: "20px", fontSize: "20px", color: "Brand.500" }}
            >
              Belum Ada Pesanan yang baru
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default PesananBaruPage;

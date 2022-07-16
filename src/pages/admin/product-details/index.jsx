/* eslint-disable no-restricted-globals */
import {
  Autocomplete,
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "config/api";
import requiresAdmin from "config/requireAdmin";
import { useEffect, useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CardStatistik from "components/Admin/CardStatistik";

const ReportCart = ({ title, data = 0, percentange = "0", notation = "+" }) => {
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      padding={2}
      height="120px"
      display="flex"
      justifyContent="space-between"
    >
      <Box width="50%">
        <Typography>{title}</Typography>
        <Typography variant="h3" marginTop={1}>
          {data}
        </Typography>
      </Box>
      <Box
        width="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {notation === "+" ? (
          <ArrowUpwardIcon sx={{ fontSize: "50px" }} color="success" />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: "50px" }} color="error" />
        )}
        <Typography variant="h4" marginLeft={1}>
          {percentange}%
        </Typography>
      </Box>
    </Box>
  );
};

const ProductDetails = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qtySold, setQtySold] = useState({});

  const fetchAllProduct = async () => {
    try {
      const res = await axiosInstance.get("/product/product-name");
      const products = res.data.result;

      const modifiedProduct = products.map((val) => {
        return { label: val.nama_produk, id: val.id };
      });
      setAllProduct(modifiedProduct);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

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

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const fetchQtySold = async () => {
    try {
      const res = await axiosInstance.post("/report/get-product-qty-sold", {
        stateOFDate: sort || "Bulanan",
        productId: selectedProduct,
      });

      console.log(res.data.result);

      setQtySold(res.data.result);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchQtySold();
    }
  }, [selectedProduct]);

  return (
    <Box>
      <Typography variant="h4" marginBottom={4}>
        Product Performance Report
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Autocomplete
          disablePortal
          options={allProduct}
          getOptionLabel={(val) => val.label}
          sx={{ width: 300 }}
          onChange={(event, value) => setSelectedProduct(value.id)}
          renderInput={(params) => (
            <TextField {...params} label="Select Product" />
          )}
        />
        <Box>
          <FormControl sx={{ width: "125px" }}>
            <Select
              sx={{ height: "25px" }}
              onChange={handleChange}
              defaultValue={sort}
            >
              <MenuItem value="Mingguan">Mingguan</MenuItem>
              <MenuItem value="Bulanan">Bulanan</MenuItem>
              <MenuItem value="Tahunan">Tahunan</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box marginTop={4} marginBottom={2}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <ReportCart
              title="Quantity Sold"
              data={qtySold.data}
              percentange={
                isNaN(
                  Math.abs(
                    ((qtySold.data - qtySold.prevData) / qtySold.prevData) * 100
                  ).toFixed(1)
                )
                  ? 0
                  : Math.abs(
                      ((qtySold.data - qtySold.prevData) / qtySold.prevData) *
                        100
                    ).toFixed(1)
              }
              notation={qtySold.data - qtySold.prevData < 0 ? "-" : "+"}
            />
          </Grid>
          <Grid item xs={4}>
            <ReportCart
              title="Item Viewed"
              data={0}
              percentange="10"
              notation="+"
            />
          </Grid>
          <Grid item xs={4}>
            <ReportCart
              title="Conversion Rate"
              data={0}
              percentange="10"
              notation="+"
            />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        {/* Statistik Profit */}

        <CardStatistik
          cardTitle="Revenue"
          column={12}
          chartOption={penjualanObatOption}
          chartSeries={penjualanObatSeries}
          selectHandle={handleChange}
          selectValue={sort}
          chartSort={[
            { sortValue: "Mingguan", sortTitle: "Mingguan" },
            { sortValue: "Bulanan", sortTitle: "Bulanan" },
            { sortValue: "Tahunan", sortTitle: "Tahunan" },
          ]}
          chartType="line"
          showSelectOption={false}
          chartHeight="258px"
        />
      </Grid>
      {/* <Typography variant="h5">revenue of this product</Typography>
        <Typography variant="h5">percentage of revenue</Typography> */}
    </Box>
  );
};

// eslint-disable-next-line no-unused-vars
export const getServerSideProps = requiresAdmin((context) => {
  return {
    props: {},
  };
});

export default ProductDetails;

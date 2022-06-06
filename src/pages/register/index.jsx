/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import Image from "next/image";
import Frame from "public/Images/Frame.png";
import GoogleIcon from "public/Images/google-icon.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import {
  InputLabel,
  OutlinedInput,
  Box,
  Stack,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState("false");
  return (
    <>
      <Stack direction="row">
        <Box>
          <Image src={Frame} layout="fixed" />
        </Box>
        <Box px="96px" py="77px">
          <Typography fontWeight="bold" variant="h4" component="h4">
            Mari Kita Mulai
          </Typography>
          <Typography m={0} sx={{ color: "gray" }}>
            Sudah punya akun ?{" "}
            <Typography component="span" sx={{ color: "Brand.500" }}>
              <u>Masuk</u>
            </Typography>
          </Typography>
          <Stack direction="row" spacing={2} marginY="32px">
            <Button
              fullWidth
              startIcon={<Image src={GoogleIcon} />}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "black",
                fontWeight: "bold",
                height: "48px",
                border: "2px solid #c7bfaf",
                boxShadow: "none",
                ":hover": { backgroundColor: "#c7bfaf", border: "unset" },
              }}
            >
              Daftar dengan Google
            </Button>
            <Button
              fullWidth
              startIcon={
                <FacebookOutlinedIcon sx={{ width: "24px", height: "24px" }} />
              }
              variant="contained"
              sx={{
                backgroundColor: "#527BCB",
                ":hover": { backgroundColor: "#527BCB", border: "unset" },
              }}
            >
              Daftar dengan Facebook
            </Button>
          </Stack>
          <Divider>atau</Divider>
          <InputLabel>Name</InputLabel>
          <OutlinedInput
            placeholder="John Doe"
            startAdornment={
              <AccountCircleIcon
                sx={{ marginRight: "17px" }}
                htmlColor="#02114f"
              />
            }
            fullWidth
            sx={{ borderRadius: "10px", marginBottom: "16px" }}
          />
          <InputLabel>Email Address</InputLabel>
          <OutlinedInput
            placeholder="JohnDoe@gmail.com"
            startAdornment={
              <MailIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
            }
            fullWidth
            sx={{ borderRadius: "10px", marginBottom: "16px" }}
          />
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "password" : "text"}
            placeholder="Password123@"
            startAdornment={
              <LockIcon sx={{ marginRight: "17px" }} htmlColor="#02114f" />
            }
            fullWidth
            sx={{ borderRadius: "10px", marginBottom: "16px" }}
            endAdornment={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <VisibilityIcon htmlColor="#02114f" sx={{}} />
                ) : (
                  <VisibilityOffIcon htmlColor="#02114f" />
                )}
              </IconButton>
            }
          />
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography>
                Saya setuju dengan{" "}
                <Typography color="Brand.500" component="span">
                  persyaratan
                </Typography>{" "}
                dan{" "}
                <Typography color="Brand.500" component="span">
                  ketentuan
                </Typography>
              </Typography>
            }
          />
          <Button
            sx={{
              minHeight: "48px",
              textTransform: "initial",
            }}
            variant="contained"
            fullWidth
          >
            Register
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default RegisterPage;
import { Box } from "@mui/material";
import AdminNavbar from "../AdminNavbar";
import AdminSidebar from "../AdminSidebar";

const AdminPageContainer = ({ children }) => {
  return (
    <Box>
      <AdminNavbar />
      <AdminSidebar />
      <Box
        sx={{
          backgroundColor:
            "linear-gradient(155.7deg, #D6F5F3 -45.88%, #F7FCFC 45.77%, #F1F5FC 117.72%)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminPageContainer;

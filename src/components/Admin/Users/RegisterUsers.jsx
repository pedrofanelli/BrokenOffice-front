import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { Form } from "./Form";
import { BackLink } from "../../../commons/BackLink";
import { axiosRegisterUser } from "../../../utils/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

export const RegisterUsers = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerData = {
      email: data.get("email"),
      password: data.get("password"),
      name: data.get("name"),
      lastName: data.get("lastName"),
      role: data.get("role"),
      type: data.get("type"),
    };

    const password = data.get("password");
    const repeatPassword = data.get("repeatPassword");

    if (password !== repeatPassword)
      return toast.error("Passwords do not match!");

    axiosRegisterUser(registerData);

    navigate("/admin/users");
  };

  return (

    <Container component="main" maxWidth="lg" sx={{minHeight:'110vh'}}>
      <BackLink text="Back to Users" href="/admin/users" />
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" color='text.primary'>
          Register <PeopleIcon fontSize="medium" />
        </Typography>
        <Form handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

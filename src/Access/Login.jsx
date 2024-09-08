import React, { useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import logo1 from "../Assets/cassilogo.png";
import logo from "../Assets/Caasi-croped-logo.png";
import { UserServices } from "../Services/User/UserServices";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthServices";
import AlertSnackbar from "../Componenets/AlertSnackbar";

const Root = styled(Box)({
  margin: 0,
  "& .mainContainer": {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    "& .content1": {
      display: "grid",
      backgroundColor: "#0171BC",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "50%",
      "& .logo1": {
        display: "flex",
        justifyContent: "center",
        width: "200px",
      },
      "& .sideLogo": {
        borderRadius: "100px",
      },
    },
    "& .content": {
      display: "grid",
      width: "25vw",
      margin: "auto",
      height: "auto",
      "& .logo": {
        display: "flex",
        justifyContent: "center",
        width: "237px",
      },
      "& .textField": {
        marginBottom: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          backgroundColor: "#EBEBEB",
          zIndex: -1,
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
        },
      },
      "& .MuiButton-root": {
        borderRadius: "10px",
        textTransform: "none",
      },
    },
  },
});
const Login = () => {
  const [data, setData] = useState({});
  const [condition, setCondition] = useState(false);
  // const [alert, setAlert] = useState({
  //   alertColor: "primary",
  //   alertMessage: "",
  //   isAlertOpen: false,
  // });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleLogIn = async () => {
    try {
      setIsLoading(true)
      let res = await UserServices.loginUser(data);
      if (res.success) {
        // setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
        AuthService.logIn(res.data.user, res.data.accessToken)
        setTimeout(() => {
          navigate("/dashboard")
        }, 2000)
      } else {
        // setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: res.message });
        setIsLoading(false)

      }
    } catch (error) {
      setIsLoading(false)

      console.log(error);
    }

    setCondition(true);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogIn()
    }
  }
  return (
    <Root>
      <Box className="mainContainer">
        <Box className="content1">
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              width: "200px",
              borderRadius: "50px",
            }}
          >
            <img className="sideLogo" src={logo1} width="100%" alt="logo" />
          </Box>
        </Box>
        <Box className="content">
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box className="logo">
                <img src={logo} width="100%" alt="logo" />
              </Box>
            </Box>
            <Box sx={{ textAlign: "start", marginBottom: 3 }}>
              <Typography variant="h4">Wellcome!</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body1">Email</Typography>
            <TextField
              className="textField"
              required
              fullWidth
              type="email"
              id="email"
              size="small"
              name="email"
              value={data?.email || ""}
              onChange={handleChange}
              placeholder="Enter Email"
              error={condition && !data?.email}
              helperText={condition && !data?.email && "Enter your Email"}
            />
          </Box>
          <Box>
            <Typography variant="body1">Password</Typography>
            <TextField
              required
              fullWidth
              className="textField"
              size="small"
              name="password"
              onKeyDown={handleKeyDown}
              value={data?.password || ""}
              onChange={handleChange}
              type="password"
              id="password"
              placeholder="Enter Password"
              error={condition && !data?.password}
              helperText={condition && !data?.password && "Enter your Password"}
            />
          </Box>
          <Link
            to={'/forgotpassword'}
            style={{
              textDecoration: "none",
              marginBottom: "5px",
              color: "primary",
              textAlign: "end",
              marginBottom: 2,
              fontWeight: "bolder",
              cursor: "pointer"
            }}
          >
            <Typography variant="body2">Forget Password?</Typography>
          </Link>
          <Button
            startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} size={20} /> : ""}
            size="large"
            variant="contained"
            fullWidth
            onClick={handleLogIn}
          >
            Login
          </Button>
        </Box>
        <Box>
          {/* <AlertSnackbar alert={alert} setAlert={setAlert} /> */}
        </Box>
      </Box>
    </Root>
  );
};

export default Login;

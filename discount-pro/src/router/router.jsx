import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../components/MainLayOut/MainLayOut";
import Home from "../components/Home/Home";
import Brands from "../components/Brands/Brands";
import AboutDev from "../components/AboutDev/AboutDev";
import Login from "../components/Login/Login";
import BrandDetails from "../components/BrandDetails/BrandDetails";
import MyProfile from "../components/MyProfile/MyProfile";
import PrivetRouter from "../components/PrivetRouter/PrivetRouter";
import Register from "./../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import UpdateInformation from "../components/UpdateInformation/UpdateInformation";
import ErrorPage from "../components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/brands",
        element: <Brands></Brands>,
      },
      {
        path: "/brands/:brandId",
        element: (
          <PrivetRouter>
            <BrandDetails></BrandDetails>
          </PrivetRouter>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <PrivetRouter>
            <MyProfile></MyProfile>
          </PrivetRouter>
        ),
      },
      {
        path: "/aboutdev",
        element: <AboutDev></AboutDev>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/forgotPassword",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "/updateInformation",
        element: (
          <PrivetRouter>
            <UpdateInformation></UpdateInformation>
          </PrivetRouter>
        ),
      },
    ],
  },
]);

export default router;

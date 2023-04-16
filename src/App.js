import "./App.css";
import { LinearProgress } from "@mui/material";
import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router";
import SignInSide from "./components/Login";
import { RegisterUsers } from "./components/Admin/Users/RegisterUsers";
import { useEffect, lazy, Suspense, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import RestorePass from "./components/RestorePass";
import { getDesignTokens } from "./utils/themeConfig";
import { ThemeProvider } from "@mui/system";
import { Box, createTheme } from "@mui/material";
import { muiStyleApp } from "./utils/styleMUI";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./state/user";
import checkType from "./utils/checkType";
import { setOffices } from "./state/office";
import { LoginProtectedRoute } from "./commons/LoginProtectedRoute";
import { History } from "../src/components/History";
import { setAllReports } from "./state/allReports";
import {
  axiosGetAssignedReportsService,
} from "./utils/axios";
import { setAssignedReports } from "./state/service";
const Home = lazy(() => import("./components/Home/Home"));
const UserHome = lazy(() => import("./components/Home/LoggedUser/index"));
const NewTicketForm = lazy(() => import("./components/User/NewTicket"));
const Profile = lazy(() => import("./components/Profile"));
const ServerReportList = lazy(() =>
  import("./components/Service/AssignedReports")
);
const AdminView = lazy(() => import("./components/Admin/Users"));
const SuperAdminView = lazy(() => import("./components/SuperAdmin/Users"));
const OfficeList = lazy(() => import("./components/Admin/Offices"));
const OfficeAdd = lazy(() => import("./components/Admin/Offices/Add"));
const SARegisterUsers = lazy(() =>
  import("./components/SuperAdmin/Users/SARegisterUsers.jsx")
);
const SingleUser = lazy(() => import("./components/Admin/Users/SingleUser"));
const SingleTicket = lazy(() => import("./components/User/SingleTicket"));
const SingleTicketService = lazy(() =>
  import("./components/Service/SingleAssignedReport")
);
const NotFoundPage = lazy(() => import("./components/NotFoundPage/NotFound"));

function App() {
  const modeTheme = useSelector((state) => state.theme.mode);
  const ROUTE = process.env.REACT_APP_ROUTE;
  const dispatch = useDispatch();


  // Update the theme only if the mode changes
  const theme = useMemo(
    () => createTheme(getDesignTokens(modeTheme)),
    [modeTheme]
  );

  useEffect(() => {
    if (user) {
      axios
        .get(`${ROUTE}/user/me`, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => {
          dispatch(setUser(data))
          localStorage.setItem("userPWA", JSON.stringify(data))
        })
        .catch((err) => {
          console.error(err);
          const user = JSON.parse(localStorage.getItem("userPWA"));
          if (user) dispatch(setUser(user))
        })
      axios
        .get(`${ROUTE}/offices`, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => {
          dispatch(setOffices(data))
          localStorage.setItem("officesPWA", JSON.stringify(data))
        })
        .catch((err) => {
          console.error(err);
          const offices = JSON.parse(localStorage.getItem("officesPWA"));
          if (offices) dispatch(setOffices(offices))
        })
      axios
        .get(`${ROUTE}/reports/history`, { withCredentials: true })
        .then((res) => res.data)
        .then((data) => {
          dispatch(setAllReports(data))
          localStorage.setItem("personalReportsPWA", JSON.stringify(data))
        })
        .catch((err) => {
          console.error(err)
          const reports = JSON.parse(localStorage.getItem("personalReportsPWA"));
          if (reports) dispatch(setAllReports(reports))
        });
    }
    if (checkType(user?.type) === 14) {
      axiosGetAssignedReportsService().then((reports) => {
        dispatch(setAssignedReports(reports));
        localStorage.setItem("serviceReportsPWA", JSON.stringify(reports))
      }).catch(() => {
        const reportss = JSON.parse(localStorage.getItem("serviceReportsPWA"));
        if (reportss) dispatch(setAssignedReports(reportss));
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ROUTE, dispatch]);

  const user = useSelector((state) => state.user);
  const initialized = user !== null;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={muiStyleApp}>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignInSide />} />
          <Route
            path="/user/restore/password/:token"
            element={<RestorePass />}
          />

          {checkType(user.type) === 404 && (
            <Route
              path="/"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <Home />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) !== 404 && (
            <Route
              path="/"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <UserHome />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) !== 404 && (
            <Route
              path="/user/new-ticket"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <NewTicketForm />
                </Suspense>
              }
            />
          )}

          <Route
            path="/user/profile"
            element={
              initialized ? (
                <LoginProtectedRoute user={user} redirectTo="/login">
                  <Suspense fallback={<LinearProgress />}>
                    <Profile />
                  </Suspense>
                </LoginProtectedRoute>
              ) : null
            }
          />

          {(checkType(user.type) === 14 ||
            checkType(user.type) === 66 ||
            checkType(user.type) === 32) && (
            <Route
              path="/service/report/all"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <ServerReportList />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) !== 404 && (
            <Route
              path="/user/ticket/:id"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SingleTicket />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) === 14 && (
            <Route
              path="/service/ticket/:id"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SingleTicketService />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) === 66 && (
            <Route
              path="/admin/users"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <AdminView />
                </Suspense>
              }
            />
          )}
          {checkType(user.type) === 32 && (
            <Route
              path="/superadmin/users"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SuperAdminView />
                </Suspense>
              }
            />
          )}

          {(checkType(user.type) === 66 || checkType(user.type) === 32) && (
            <Route
              path="/admin/offices"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <OfficeList />
                </Suspense>
              }
            />
          )}
          {(checkType(user.type) === 66 || checkType(user.type) === 32) && (
            <Route
              path="/admin/offices/register"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <OfficeAdd />
                </Suspense>
              }
            />
          )}
          {(checkType(user.type) === 66 || checkType(user.type) === 32) && (
            <Route
              path="/admin/users/register"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <RegisterUsers />
                </Suspense>
              }
            />
          )}
          {(checkType(user.type) === 66 || checkType(user.type) === 32) && (
            <Route
              path="/admin/user/:id"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SingleUser />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) === 32 && (
            <Route
              path="/superadmin/users/register"
              element={
                <Suspense fallback={<LinearProgress />}>
                  <SARegisterUsers />
                </Suspense>
              }
            />
          )}

          {checkType(user.type) !== 404 && (
            <Route path="/user/history" element={<History />} />
          )}
          <Route
            path="*"
            element={
              <Suspense fallback={<LinearProgress />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;

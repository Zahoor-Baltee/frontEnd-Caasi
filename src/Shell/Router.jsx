import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Access/Login";
import NewDefaultLayout from "../Layout/NewDefaultLayout";
import ForgotPassword from "../Access/ForgotPassword";
import Confirmation from "../Access/Confirmation";
import EnterExpenseReport from "../Pages/ExpenseReports/ExpenseReports";
import DashboardUsingGrid from "../Pages/Dashboard/DashboardUsingGrid";
import TickPlacementBars from "../Componenets/Chart";
import User from "../Pages/User/User";
import AddUser from "../Pages/User/AddUser";
import UserInformation from "../Pages/User/UserInformation";
import ExpenseReportTable from '../Componenets/ExpenseReportTable';
import ExpenseList from '../Pages/ExpenseReports/ExpenseReportList';
import ExpenseReports from "../Pages/ExpenseReports/ExpenseReports";

import ReportsAndExport from "../Pages/Reports And Exports/ReportsAndExport";
import AdvancedSettingAndManagement from "../Pages/Advanced Setting And Management/AdvancedSettingAndManagement";
import Notification from "../Pages/Notification/Notifications";
import Protected from "./Protected";
import ActivityReport from "../Pages/Activity Report/ActivityReport";
import AddActivity from "../Pages/Activity Report/AddActivity";
import NewAbsence from "../Pages/DayOfAbsence/NewAbsence";

const WithLayout = ({ component }) => {
  return <NewDefaultLayout><Protected>{component}</Protected></NewDefaultLayout>;
};
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<WithLayout component={<DashboardUsingGrid />} />}
        />
        <Route
          path="/enterexpensereport"
          element={<WithLayout component={<EnterExpenseReport />} />}
        />
        <Route
          path="/user"
          element={<WithLayout component={<User />} />}
        />
        <Route
          path="/user-add"
          element={<WithLayout component={<AddUser />} />}
        />
        <Route
          path="/userinformation"
          element={<WithLayout component={<UserInformation />} />}
        />
        <Route
          path="/expensereporttable"
          element={<WithLayout component={<ExpenseReportTable />} />}
        />
        <Route
          path="/expense-list"
          element={<WithLayout component={<ExpenseList />} />}
        />
        <Route
          path="/expensereports"
          element={<WithLayout component={<ExpenseReports />} />}
        />
        <Route
          path="/activityreport"
          element={<WithLayout component={<ActivityReport />} />}
        />
        <Route
          path="/add-activity"
          element={<WithLayout component={<AddActivity />} />}
        />
        <Route
          path="/new-absence"
          element={<WithLayout component={<NewAbsence />} />}
        />
        <Route
          path="/reportsandexport"
          element={<WithLayout component={<ReportsAndExport />} />}
        />
        <Route
          path="/advancesetting"
          element={<WithLayout component={<AdvancedSettingAndManagement />} />}
        />
        <Route
          path="/notify"
          element={<WithLayout component={<Notification />} />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/confirmation" element={<Confirmation />} />

        <Route path="/productlist" element={<WithLayout component="" />} />
        <Route path="/dashboardusinggrid" element={<DashboardUsingGrid />} />
        <Route path="/chart" element={<TickPlacementBars />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

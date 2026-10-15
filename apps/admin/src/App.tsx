import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CalendarPage from "./pages/CalendarPage";
import ReservationsPage from "./pages/ReservationsPage";
import PaymentsPage from "./pages/PaymentsPage";
import CustomersPage from "./pages/CustomersPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./components/feedback/NotFoundPage";
import MainLayout from "./layouts/MainLayout";
import CourtsPage from "./pages/CourtsPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/auth"} element={<LoginPage />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route index path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/courts" element={<CourtsPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster theme="system" />
    </>
  );
};

export default App;

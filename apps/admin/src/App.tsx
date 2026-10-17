import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import PublicRoute from "@/features/auth/components/PublicRoute";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import CalendarPage from "@/pages/CalendarPage";
import ReservationsPage from "@/pages/ReservationsPage";
import PaymentsPage from "@/pages/PaymentsPage";
import CustomersPage from "@/pages/CustomersPage";
import UsersPage from "@/pages/UsersPage";
import NotFoundPage from "@/components/feedback/NotFoundPage";
import MainLayout from "@/layouts/MainLayout";
import CourtsPage from "@/pages/CourtsPage";
import ForbiddenPage from "@/components/feedback/ForbiddenPage";
import HomeRedirect from "./features/auth/components/HomeRedirect";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicRoute />}>
          <Route path={"/auth"} element={<LoginPage />} />
        </Route>

        {/* AuthN routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            {/* Role-based home redirect */}
            <Route index element={<HomeRedirect />} />

            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/courts" element={<CourtsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/customers" element={<CustomersPage />} />

            {/* Admin only routes */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster theme="system" />
    </>
  );
};

export default App;

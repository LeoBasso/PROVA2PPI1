import { Route, Routes } from "react-router-dom";
import SharedLayout from "./pages/dashboard/SharedLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import ProtectedRoute from "./pages/ProtectedRoute";
import EditarAtividade from "./components/EditarAtividade";
import ActivitiesContainer from "./pages/dashboard/activities/ActivitiesContainer";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        }
      >
        {/* <Route path="addActivity" element={<ActivitiesContainer />} /> */}
        <Route path="editActivity" element={<EditarAtividade />} />
        <Route path="/" element={<ActivitiesContainer />} />
      </Route>

      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
}

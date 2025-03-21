import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

const App: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            {/* Accesible solo para admin */}
            <Route
              index
              path="/"
              element={
                <ProtectedRoute user={user} requiredRole="admin">
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Accesible solo para usuarios autenticados */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <UserProfiles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute user={user}>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/minion-dashboard"
              element={
                <ProtectedRoute user={user}>
                  <Blank />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Auth Layout (Abierto a todos) */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


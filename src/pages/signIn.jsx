import React, { useContext, useState } from 'react'
import AuthLayout from '../components/Layouts/AuthLayout'
import FormSignIn from '../components/Fragments/FormSignIn'
import { loginService } from '../services/authService'
import { AuthContext } from '../context/authContext'
import AppSnackbar from '../components/Elements/AppSnackbar'
import { ModeContext } from "../context/modeContext";

function signIn() {
  const { login } = React.useContext(AuthContext);
  const { darkMode, toggleMode } = useContext(ModeContext);
  	const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); 
  
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
			
			login(refreshToken);
    } catch (err) {
      setSnackbar({ open: true, message: err.msg, severity: "error" });
    }
  };

  return (
        <AuthLayout>
      <div className={darkMode ? "text-white" : ""}>
        <FormSignIn onSubmit={handleLogin} />

        <div className="flex justify-center mt-6">
          <button
            onClick={toggleMode}
            className="text-2xl"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  )
}

export default signIn
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import LabeledInput from "../Elements/LabeledInput";
import CheckBox from "../Elements/CheckBox";
import Button from "../Elements/Button";
import AppSnackbar from "../Elements/AppSnackbar";

function FormSignUp() {
const [openSnackbar, setOpenSnackbar] = useState(false);
const [message, setMessage] = useState("");
const [severity, setSeverity] = useState("success");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama wajib diisi"),
      email: Yup.string()
        .email("Format email tidak valid")
        .required("Email wajib diisi"),
      password: Yup.string()
        .min(6, "Password minimal 6 karakter")
        .required("Password wajib diisi"),
      terms: Yup.boolean().oneOf(
        [true],
        "Anda harus menyetujui Terms and Conditions"
      ),
    }),
    onSubmit: async (values, { setSubmitting }) => {
  setMessage("");
  setSeverity("success");
  setOpenSnackbar(false);

      try {
        const response = await fetch(
          "https://jwt-auth-eight-neon.vercel.app/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              email: values.email,
              password: values.password,
            }),
          }
        );

        const data = await response.json();

      if (!response.ok) {
          setMessage(data.message || "Email sudah pernah digunakan sebelumnya");
          setSeverity("error");
          setOpenSnackbar(true);
          return;
        }

        setMessage("Registrasi berhasil");
        setSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        setMessage("Terjadi kesalahan saat register");
        setSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <h1 className="mt-5 text-3xl font-bold text-gray-800 text-center">
        Create an account
      </h1>

      <div className="mt-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <LabeledInput
              label="Name"
              type="text"
              placeholder="Evan Arya"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-6">
            <LabeledInput
              label="Email address"
              type="email"
              placeholder="hello@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <LabeledInput
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div className="mb-3">
            <CheckBox
              label="I agree to the Terms and Conditions"
              id="terms"
              type="checkbox"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
            />
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.terms}</p>
            )}
          </div>

          <Button type="submit">
            {formik.isSubmitting ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </div>

      <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
        <div className="border border-gray-05 w-full"></div>
        <div className="px-2 bg-special-mainBg absolute"> or sign up with</div>
      </div>

      <div className="mb-8">
        <Button type="button" variant="secondary">
          Continue with Google
        </Button>
      </div>

      <div className="flex justify-center text-gray-03">
        <span className="text-sm mr-1">Already have an account?</span>
        <a href="/login" className="text-primary text-sm font-bold">
          Sign In Here
        </a>
      </div>

      <AppSnackbar
        open={openSnackbar}
        message={message}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />

    </>
  );
}

export default FormSignUp;
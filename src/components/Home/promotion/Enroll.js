import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSuccessToast, showErrorToast } from "../../Utils/tools";
import { promotionsCollection } from "../../../firebase";
import { useState } from "react";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("The email is required"),
    }),
    onSubmit: (value) => {
      setLoading(true);
      // Submit value
    },
  });

  return (
    <Fade>
      <div className="enroll_wrapper">
        <form onSubmit={formik.handleSubmit}>
          <div className="enroll_title">Enter your email</div>
          <div className="enroll_input">
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="error_label">{formik.errors.email}</div>
            ) : null}

            {loading ? (
              <CircularProgress className="progress" />
            ) : (
              <button type="submit">Submit</button>
            )}

            <div className="enroll_discl">
              asdfd sdafas asdfasdfad asdfadsf asdfasdf asdfadsf asdfadsf
            </div>
          </div>
        </form>
      </div>
    </Fade>
  );
};

export default Enroll;

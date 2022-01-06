import { Fade } from "react-awesome-reveal";
import { CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showSuccessToast, showErrorToast } from "../../Utils/tools";
import { promotionsCollection } from "../../../firebase";
import { useState } from "react";

const Enroll = () => {
  const [loading, setLoading] = useState(false);

  const submitForm = async (values) => {
    try {
      const isOnTheList = await promotionsCollection
        .where("email", "==", values.email)
        .get();

      if (isOnTheList.docs.length >= 1) {
        showErrorToast("Sorry, this is mail is already registered!");
        setLoading(false);
        return false;
      }

      await promotionsCollection.add({ email: values.email });
      setLoading(false);
      showSuccessToast("Congratulation!");
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is invalid")
        .required("The email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      // Submit value
      submitForm(values);
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

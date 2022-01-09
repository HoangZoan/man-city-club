import AdminLayout from "../../HOC/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showSuccessToast,
  showErrorToast,
  textErrorHelper,
  selectErrorHelper,
  selectError,
} from "../../Utils/tools";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { firebase, playersCollection } from "../../../firebase";
import { useEffect, useState } from "react";

const defaultValues = {
  name: "",
  lastName: "",
  number: "",
  position: "",
};

const AddEditPlayers = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("The input is required"),
      lastName: Yup.string().required("The input is required"),
      number: Yup.number()
        .required("The input is required")
        .min("0", "Number must be bigger than 0")
        .max("100", "The maximun valid number is 100"),
      position: Yup.string().required("The input is required"),
    }),
  });

  useEffect(() => {
    const params = props.match.params.playerid;

    if (params) {
      setFormType("edit");
      setValues(defaultValues);
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.playerid]);

  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            image
            <hr />
            <h4>Player info</h4>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="name"
                  name="name"
                  variant="outlined"
                  placeholder="Add First Name"
                  {...formik.getFieldProps("name")}
                  {...textErrorHelper(formik, "name")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="lastName"
                  name="lastName"
                  variant="outlined"
                  placeholder="Add Last Name"
                  {...formik.getFieldProps("lastName")}
                  {...textErrorHelper(formik, "lastName")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="number"
                  name="number"
                  variant="outlined"
                  placeholder="Add Number"
                  {...formik.getFieldProps("number")}
                  {...textErrorHelper(formik, "number")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl error={selectError(formik, "position")}>
                <Select
                  id="position"
                  name="position"
                  variant="outlined"
                  {...formik.getFieldProps("position")}
                  displayEmpty
                >
                  <MenuItem value="" disabled sx={{ display: "none" }}>
                    Choose a position
                  </MenuItem>
                  <MenuItem value="keeper">Keeper</MenuItem>
                  <MenuItem value="defence">Defence</MenuItem>
                  <MenuItem value="midfield">Midfield</MenuItem>
                  <MenuItem value="striker">Striker</MenuItem>
                </Select>
                {selectErrorHelper(formik, "position")}
              </FormControl>
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {formType === "add" ? "Add" : "Edit"}
            </Button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddEditPlayers;

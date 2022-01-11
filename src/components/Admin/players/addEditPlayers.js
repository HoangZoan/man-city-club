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
import Fileuploader from "../../Utils/fileUploader";

const defaultValues = {
  name: "",
  lastname: "",
  number: "",
  position: "",
  image: "",
};

const AddEditPlayers = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [defaultImg, setDefaultImg] = useState("");

  const submitForm = (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
      playersCollection
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Player added");
          formik.resetForm();
          props.history.push("/admin_players");
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => setLoading(false));
    } else {
      playersCollection
        .doc(props.match.params.playerid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast("Player updated");
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => setLoading(false));
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("The input is required"),
      lastname: Yup.string().required("The input is required"),
      number: Yup.number()
        .required("The input is required")
        .min(0, "Number must be bigger than 0")
        .max(100, "The maximun valid number is 100"),
      position: Yup.string().required("The input is required"),
      image: Yup.string().required("The input is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  useEffect(() => {
    const params = props.match.params.playerid;

    if (params) {
      playersCollection
        .doc(params)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            firebase
              .storage()
              .ref("players")
              .child(snapshot.data().image)
              .getDownloadURL()
              .then((url) => {
                updateImageName(snapshot.data().image);
                setDefaultImg(url);
              });

            setFormType("edit");
            setValues(snapshot.data());
          } else {
            showErrorToast("Sorry, the player is not found");
          }
        });
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.playerid]);

  const updateImageName = (filename) => {
    formik.setFieldValue("image", filename);
  };

  const resetImage = () => {
    formik.setFieldValue("image", "");
    setDefaultImg("");
  };

  return (
    <AdminLayout title={formType === "add" ? "Add Player" : "Edit Player"}>
      <div className="editplayers_dialog_wrapper">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <Fileuploader
                dir="players"
                defaultImgName={values.image}
                defaultImg={defaultImg}
                filename={(filename) => updateImageName(filename)}
                resetImage={() => {
                  resetImage();
                }}
              />
              {selectErrorHelper(formik, "image")}
            </FormControl>
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
                  id="lastname"
                  name="lastname"
                  variant="outlined"
                  placeholder="Add Last Name"
                  {...formik.getFieldProps("lastname")}
                  {...textErrorHelper(formik, "lastname")}
                />
              </FormControl>
            </div>
            <div className="mb-5">
              <FormControl>
                <TextField
                  id="number"
                  name="number"
                  type="number"
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
                  <MenuItem value="" disabled>
                    Choose a position
                  </MenuItem>
                  <MenuItem value="Keeper">Keeper</MenuItem>
                  <MenuItem value="Defence">Defence</MenuItem>
                  <MenuItem value="Midfield">Midfield</MenuItem>
                  <MenuItem value="Striker">Striker</MenuItem>
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

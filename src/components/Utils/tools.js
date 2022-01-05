import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import mancitylogo from "../../Resources/images/logos/manchester_city_logo.png";
import { firebase } from "../../firebase";

export const CityLogo = (props) => {
  const { link, linkTo, width, height } = props;

  const template = (
    <div
      className="img_cover"
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${mancitylogo})`,
      }}
    />
  );

  if (link) {
    return (
      <Link className="link_logo" to={linkTo}>
        {template}
      </Link>
    );
  } else {
    return template;
  }
};

export const showSuccessToast = (text) => {
  toast.success(text, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const showErrorToast = (text) => {
  toast.error(text, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

export const logoutHandler = () => {
  firebase
    .auth()
    .signOut()
    .then(() => showSuccessToast("Good bye!"))
    .catch((error) => showErrorToast(error.message));
};

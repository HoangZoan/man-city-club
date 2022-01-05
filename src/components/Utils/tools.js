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

export const Tag = (props) => {
  const template = (
    <div
      style={{
        background: props.bck ? props.bck : "#ffffff",
        fontSize: props.size ? props.size : "15px",
        color: props.color ? props.color : "#000000",
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous",
        ...props.add,
      }}
    >
      {props.children}
    </div>
  );

  if (props.link) {
    return <Link to={props.linkTo}>{template}</Link>;
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

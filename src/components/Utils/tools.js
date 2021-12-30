import { Link } from "react-router-dom";
import mancitylogo from "../../Resources/images/logos/manchester_city_logo.png";

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

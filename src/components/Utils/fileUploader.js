import { Component } from "react";
import { firebase } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
import { CircularProgress } from "@mui/material";

class Fileuploader extends Component {
  state = {
    name: "", // name of the file blahBlah.png
    isUploading: false,
    fileURL: "", // httt://firebase/hosting.1911i2j/namsm.png
    image: "",
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = (e) => {
    alert(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });

    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ fileURL: url });
      });

    this.props.filename(filename);
  };

  uploadAgain = () => {
    this.setState({
      name: "",
      isUploading: false,
      fileURL: "",
    });
    this.props.resetImage();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.defaultImgName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        {!this.state.fileURL && (
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        )}

        {this.state.isUploading && (
          <div
            className="progress"
            style={{ textAlign: "center", margin: "30px 0" }}
          >
            <CircularProgress style={{ color: "#98c6e9" }} thickness={7} />
          </div>
        )}

        {this.state.fileURL && (
          <div className="image_upload_container">
            <img
              style={{
                width: "100%",
              }}
              src={this.state.fileURL}
              alt={this.state.name}
            ></img>
            <div className="remove" onClick={() => this.uploadAgain()}>
              Remove
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Fileuploader;

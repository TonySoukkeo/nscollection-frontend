import React from "react";
import LoadingGif from "../../assets/loading/loading.gif";

const Loading = styles => {
  return (
    <img
      style={styles.styles}
      className="loading"
      src={LoadingGif}
      alt="loading"
    />
  );
};

export default Loading;

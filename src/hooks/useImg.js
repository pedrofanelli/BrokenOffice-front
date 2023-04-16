import { useState, useEffect } from "react";

const useImg = (url) => {
  const [img, setImg] = useState("");
  useEffect(() => {
    setImg(url);
  }, []);
  return {
    img,
  };
};

export default useImg;

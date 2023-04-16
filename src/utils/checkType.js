function checkType(type) {
  if (process.env.REACT_APP_ALPHA === type) return 66;
  if (process.env.REACT_APP_BETA === type) return 14;
  if (process.env.REACT_APP_GAMA === type) return 21;
  if (process.env.REACT_APP_OMEGA === type) return 32;

  return 404;
}

export default checkType;

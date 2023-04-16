const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export default function getGeolocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const crd = pos.coords;
          resolve({ lat: crd.latitude, lng: crd.longitude });
        },
        (err) => {
          reject(err);
        },
        options
      );
    });
  }
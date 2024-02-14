function getBackendUrl(suffix: string) {
  let backendUrl;
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "192.168.2.173"
  ) {
    // When developing
    backendUrl = `http://192.168.2.173:3000/api/smart-diet-tracker/${suffix}`;
  } else {
    // When in production
    backendUrl = `https://main-api-0xrx.onrender.com/api/smart-diet-tracker/${suffix}`;
  }
  return backendUrl;
}

export default getBackendUrl;

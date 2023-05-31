const api = async (url) => {
  try {
    const response = await fetch(url);
    const resJson = await response.json();
    return resJson;
  } catch {
    console.log("response isn't fetched");
  }
};
export default api;

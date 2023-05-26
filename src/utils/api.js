const api = async(url) =>{
    const response = await fetch(url);
     const resJson = response.json();
     return resJson;
};
export default api;
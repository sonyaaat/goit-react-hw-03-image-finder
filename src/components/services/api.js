import axios from "axios";
const KEY = '30406660-ac7e622e7ed4967628563eb0e';
const URL = 'https://pixabay.com/api/';
async function fetchImages(name,page){
    const response = await axios.get(`${URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response;
}
const api = {
    fetchImages,
  };
  export default api;
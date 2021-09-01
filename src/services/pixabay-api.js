const API_KEY = '21948076-53f9c976759f5ce811ed96a6f';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

function fetchPhotos( searchName = '', page = 1, perPage = 12 )  {
  return fetch(`${BASE_URL}q=${searchName}&page=${page}&key=${API_KEY}&per_page=${perPage}`)
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
      return Promise.reject(new Error(`Помилка запиту`))
    })
};

const api ={
  fetchPhotos
};

export default api;
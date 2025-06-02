import api from '../axios/AxiosConfig';
import Config from 'react-native-config';

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY:
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWM5MDAzNjEwZDAzNDBkNmM3ZDMyYWYzYzkwNzBmOSIsIm5iZiI6MTc0NDQyNTQyOS44MzUsInN1YiI6IjY3ZjlkMWQ1ZDNhYjdkN2E4YmFkYzQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUb0iZgfNeeUN-WoZJpfUVqLBWjNn4XelJFH3S6aDCA',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWM5MDAzNjEwZDAzNDBkNmM3ZDMyYWYzYzkwNzBmOSIsIm5iZiI6MTc0NDQyNTQyOS44MzUsInN1YiI6IjY3ZjlkMWQ1ZDNhYjdkN2E4YmFkYzQ1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xUb0iZgfNeeUN-WoZJpfUVqLBWjNn4XelJFH3S6aDCA'}`,
  },
};

export async function fetchData(url: string) {
  const reponse = await api.get(Config.PUBLIC_LINK + '/api/' + url);

  return reponse.data.data;
}

export async function fetchDataMovieFavoriteList() {
  const reponse = await api.get(
    Config.PUBLIC_LINK + '/api/users/get-favorite-movies',
  );
  return reponse.data.data;
}

export async function fetchDataMovieDetail(id: string) {
  const reponse = await api.get(Config.PUBLIC_LINK + '/api/movies/' + id);

  return reponse.data.data;
}

export async function fetchDataMovieDetailMain(id: number) {
  const rp = await api.get('/api/movies/' + id);

  return rp.data.data;
}

export async function fetchSeasonsByMovieID(id: number) {
  const rp = await api.get('/api/seasons/getSeasonsByMoiveId/' + id);

  return rp.data.data;
}

export async function fetchEpisodesBySeasonID(id: number) {
  const rp = await api.get('/api/Episodes/season/' + id);

  return rp.data.data;
}

export function fetchScreenTimeToServer(value: number) {
  const data = {
    value: value,
  };

  api
    .post('/api/users/update-screen-time', data)
    .then()
    .catch(error => {
      console.error('Error updating screen time:', error);
    });
}

export async function fetchMyProfile() {
  const response = await api.get(
    Config.PUBLIC_LINK + '/api/users/get-my-profile',
  );
  return response.data.data;
}

export async function fetchRelatedMovies() {
  const response = await api.get('/api/movies/getRandom');
  return response.data.data;
}

export async function UpdateProfile(form: FormData) {
  const rp = await api.put('/api/users/update-my-profile', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return rp;
}

export async function FetchAllGeneres() {
  const rp = await api.get('/api/generes/getAll');

  return rp.data.data;
}

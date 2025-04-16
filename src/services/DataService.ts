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
  console.log(url);

  const reponse = await fetch(TMDB_CONFIG.BASE_URL + '/' + url, {
    headers: TMDB_CONFIG.headers,
    method: "GET"
  });

  if (!reponse.ok) {
    throw new Error('Failed to get data!!!');
  }

  const data = await reponse.json();
  

  return data.results;
}

export async function fetchDataMovieDetail(id : string) {

  const reponse = await fetch(TMDB_CONFIG.BASE_URL + '/movie/' + id, {
    headers: TMDB_CONFIG.headers,
  });

  if (!reponse.ok) {
    throw new Error('Failed to get data!!!');
  }

  const data = await reponse.json();

  return data;
}

export interface Movie {
  id: number;
  title: string;
  backdropPath: string;
  generes: Genere[];
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  hasSeason?: boolean;
}

interface TrendingMovie {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  backdropPath: string;
  generes: Genere[];
  overview: string;
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  hasSeason?: boolean;
  productionCompanies: Company[];
  path: string;
  revenue: number;
  runtime: number;
  status: string;
  budget: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

type StackRootIn = {
  Main: undefined;
  Details: {itemId: number};
  Video: {itemId: number};
  Intro: undefined;
  MainStack: undefined;
  Login: undefined;
  Register: undefined;
  MainForgotPassScreen: undefined;
  EnterCodeScreen: {resetPassToken: string | null};
  SetPassScreen: {resetPassToken: string | null};
  Drawer: undefined;
  GettingStarted: undefined;
};

export interface EpisodeItemInfo {
  id: string;
  title: string;
  overview: string;
  posterPath: string;
  // duration: number;
  episodeNumber: number;
  movieId: string;
  seasonId: string;
  path: string;
}

export interface IAuth {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  setTokens: (newAccessToken: string, newRefreshToken: string) => void;
  clearTokens: () => void;
}

export interface MovieItemDetail {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  voteAverage: number;
  voteCount: number;
  status: boolean;
  hasSeason: boolean;
  path: string;
}

export interface Season {
  id: number;
  title: string;
  description: string;
  seasonNumber: number;
  releaseDate: string;
}

export interface Genere {
  id: number;
  name: string;
}

export interface Company {
  id: number;
  name: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  doB: string;
  avatar?: string | null;
  screenTime: number;
}

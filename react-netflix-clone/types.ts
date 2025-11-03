export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  youtube_trailer_id: string;
  genres: string[];
  vote_average?: number;
}
import { GenreType } from './genres';

export type MovieType = {
	id: number;
	title: string;
	overview: string;
	tagline: string;
	status: string;
	popularity: number;
	vote_average: number;
	vote_count: number;
	release_date: string;
	genre: GenreType;
	genres: GenreType[];
	homepage: string;
	poster_path: string;
	backdrop_path: string;
};

export type MovieProps = {
	movie: MovieType;
	width: string | number;
	height: string | number;
};

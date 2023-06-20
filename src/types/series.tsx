import { GenreType } from './genres';

export type SeriesType = {
	id: number;
	name: string;
	overview: string;
	tagline: string;
	popularity: number;
	number_of_episodes: number;
	number_of_seasons: number;
	vote_average: number;
	vote_count: number;
	genre: GenreType;
	genres: GenreType[];
	homepage: string;
	poster_path: string;
	backdrop_path: string;
};

export type SeriesProps = {
	series: SeriesType;
	width: string | number;
	height: string | number;
};

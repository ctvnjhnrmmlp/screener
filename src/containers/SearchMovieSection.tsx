import Movie from './Movie';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
	Autocomplete,
	Title,
	Text,
	Container,
	Space,
	Skeleton,
	createStyles,
} from '@mantine/core';
import { BsSearch } from 'react-icons/bs';
import { MovieType } from '@/types/movie';
import _ from 'lodash';

const useStyles = createStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		gap: '1.5rem',
	},
	subHeading: {
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
		lineHeight: '1.2',
		textAlign: 'center',
	},
	title: {
		fontWeight: 700,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1.2,
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
	},
	overview: {
		fontSize: 'clamp(1.30rem, 0.91vw + 0.77rem, 2.67rem)',
	},
	date: {
		fontStyle: 'italic',
		fontSize: 'clamp(1.25rem, 0.59vw + 0.65rem, 2rem)',
		lineHeight: '1',
	},
	body: {
		padding: theme.spacing.md,
	},
}));

export default function SearchMovieSection() {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { classes } = useStyles();
	const skeletonHeight = 600;

	const {
		data: moviesDiscover,
		error: moviesDiscoverError,
		status: moviesDiscoverStatus,
	} = useQuery({
		queryKey: ['movies-discover'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie`,
				{
					params: {
						api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						include_adult: false,
						include_video: false,
						language: 'en-US',
						page: 1,
					},
				}
			);

			return response.data.results;
		},
		refetchOnWindowFocus: false,
	});

	const {
		data: movies,
		error: moviesError,
		status: moviesStatus,
		fetchStatus: moviesFetchStatus,
		refetch: refetchMovies,
	} = useQuery({
		queryKey: ['movies'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/search/movie`,
				{
					params: {
						api_key: `${process.env.NEXT_PUBLIC_API_KEY}`,
						query: searchInputRef.current ? searchInputRef.current.value : '',
						include_adult: false,
						language: 'en-US',
						page: 1,
					},
				}
			);

			return response.data.results;
		},
		refetchOnWindowFocus: false,
	});

	const handleRefetchMovies = () => {
		refetchMovies();
	};

	return (
		<section>
			<Space h='xl' />
			<Container size='xl'>
				<Autocomplete
					ref={searchInputRef}
					icon={<BsSearch />}
					placeholder='Search Movie'
					size='xl'
					data={['Titanic', 'Avatar', 'Cast Away', 'Forrest Gump']}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleRefetchMovies();
					}}
				/>
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Movies</Title>
				<Space h='xl' />
				<Space h='xl' />
				<Container className={classes.container} size='xl'>
					{moviesStatus === 'loading' || moviesFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : moviesError ? (
						searchInputRef.current!.value.length <= 0 ? (
							<Text align='center' size='lg'>
								Please input a movie.
							</Text>
						) : (
							<Text align='center' size='lg'>
								Movie not found.
							</Text>
						)
					) : searchInputRef.current!.value.length === 0 ? (
						moviesDiscover.map((movie: MovieType) => {
							if (movie.poster_path)
								return (
									<Movie
										key={movie.id}
										movie={movie}
										width={350}
										height={600}
									/>
								);
						})
					) : (
						movies.map((movie: MovieType) => {
							if (movie.poster_path)
								return (
									<Movie
										key={movie.id}
										movie={movie}
										width={350}
										height={600}
									/>
								);
						})
					)}
				</Container>
			</Container>
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
		</section>
	);
}

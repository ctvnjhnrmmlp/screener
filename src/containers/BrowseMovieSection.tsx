import Movie from './Movie';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Title, Container, Space, Skeleton, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { MovieType } from '@/types/movie';
import _ from 'lodash';

const useStyles = createStyles((theme) => ({
	mainHeading: {
		textAlign: 'center',
		fontSize: 'clamp(5.5rem, calc(30.27vw + -7.07rem), 10.07rem)',
	},
	subHeading: {
		fontSize: 'clamp(1.56rem, 3.32vw + -0.03rem, 4rem)',
		lineHeight: '1.2',
	},
}));

export default function BrowseMovieSection() {
	const { classes } = useStyles();
	const skeletonHeight = 600;

	const {
		data: moviesDiscover,
		error: moviesDiscoverError,
		status: moviesDiscoverStatus,
		fetchStatus: moviesDiscoverFetchStatus,
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
		data: moviesTrending,
		error: moviesTrendingError,
		status: moviesTrendingStatus,
		fetchStatus: moviesTrendingFetchStatus,
	} = useQuery({
		queryKey: ['movies-trending'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day`,
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
		data: moviesNowPlaying,
		error: moviesNowPlayingError,
		status: moviesNowPlayingStatus,
		fetchStatus: moviesNowPlayingFetchStatus,
	} = useQuery({
		queryKey: ['movies-now-playing'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing`,
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
		data: moviesTopRated,
		error: moviesTopRatedError,
		status: moviesTopRatedStatus,
		fetchStatus: moviesTopRatedFetchStatus,
	} = useQuery({
		queryKey: ['movies-top-rated'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated`,
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
		data: moviesUpcoming,
		error: moviesUpcomingError,
		status: moviesUpcomingStatus,
		fetchStatus: moviesUpcomingFetchStatus,
	} = useQuery({
		queryKey: ['movies-upcoming'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming`,
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

	return (
		<section>
			<Carousel
				loop
				slideSize='40%'
				slideGap='xl'
				align='start'
				slidesToScroll={1}
			>
				{moviesDiscoverStatus === 'loading' ||
				moviesDiscoverFetchStatus === 'fetching' ? (
					<Skeleton height={skeletonHeight} radius='xl' />
				) : moviesDiscoverError ? (
					<Skeleton height={skeletonHeight} radius='xl' />
				) : (
					moviesDiscover.map((movie: MovieType) => {
						return (
							<Carousel.Slide key={movie.id}>
								<Movie movie={movie} width='100%' height='auto' />
							</Carousel.Slide>
						);
					})
				)}
			</Carousel>
			<Container size='xl'>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.mainHeading}>Movies</Title>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Trending Now</Title>
				<Space h='xl' />
				<Carousel
					loop
					slideSize='40%'
					slideGap='xl'
					align='start'
					slidesToScroll={1}
				>
					{moviesTrendingStatus === 'loading' ||
					moviesTrendingFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : moviesTrendingError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						moviesTrending.map((movie: MovieType) => {
							return (
								<Carousel.Slide key={movie.id}>
									<Movie movie={movie} width='100%' height='auto' />
								</Carousel.Slide>
							);
						})
					)}
				</Carousel>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Now Playing</Title>
				<Space h='xl' />
				<Carousel
					loop
					slideSize='40%'
					slideGap='xl'
					align='start'
					slidesToScroll={1}
				>
					{moviesNowPlayingStatus === 'loading' ||
					moviesNowPlayingFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : moviesNowPlayingError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						moviesNowPlaying.map((movie: MovieType) => {
							return (
								<Carousel.Slide key={movie.id}>
									<Movie movie={movie} width='100%' height='auto' />
								</Carousel.Slide>
							);
						})
					)}
				</Carousel>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Top Rated</Title>
				<Space h='xl' />
				<Carousel
					loop
					slideSize='40%'
					slideGap='xl'
					align='start'
					slidesToScroll={1}
				>
					{moviesTopRatedStatus === 'loading' ||
					moviesTopRatedFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : moviesTopRatedError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						moviesTopRated.map((movie: MovieType) => {
							return (
								<Carousel.Slide key={movie.id}>
									<Movie movie={movie} width='100%' height='auto' />
								</Carousel.Slide>
							);
						})
					)}
				</Carousel>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Upcoming</Title>
				<Space h='xl' />
				<Carousel
					loop
					slideSize='40%'
					slideGap='xl'
					align='start'
					slidesToScroll={1}
				>
					{moviesUpcomingStatus === 'loading' ||
					moviesUpcomingFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : moviesUpcomingError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						moviesUpcoming.map((movie: MovieType) => {
							return (
								<Carousel.Slide key={movie.id}>
									<Movie movie={movie} width='100%' height='auto' />
								</Carousel.Slide>
							);
						})
					)}
				</Carousel>
			</Container>
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
		</section>
	);
}

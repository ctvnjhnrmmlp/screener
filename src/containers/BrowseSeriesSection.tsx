import Series from './Series';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Title, Container, Space, Skeleton, createStyles } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import _ from 'lodash';
import { SeriesType } from '@/types/series';

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

export default function BrowseSeriesSection() {
	const { classes } = useStyles();
	const skeletonHeight = 600;

	const {
		data: seriesDiscover,
		error: seriesDiscoverError,
		status: seriesDiscoverStatus,
		fetchStatus: seriesDiscoverFetchStatus,
	} = useQuery({
		queryKey: ['series-discover'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv`,
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
		data: seriesAiringToday,
		error: seriesAiringTodayError,
		status: seriesAiringTodayStatus,
		fetchStatus: seriesAiringTodayFetchStatus,
	} = useQuery({
		queryKey: ['series-airing-today'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/tv/airing_today`,
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
		data: seriesTopRated,
		error: seriesTopRatedError,
		status: seriesTopRatedStatus,
		fetchStatus: seriesTopRatedFetchStatus,
	} = useQuery({
		queryKey: ['series-top-rated'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/tv/top_rated`,
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
				{seriesDiscoverStatus === 'loading' ||
				seriesDiscoverFetchStatus === 'fetching' ? (
					<Skeleton height={skeletonHeight} radius='xl' />
				) : seriesDiscoverError ? (
					<Skeleton height={skeletonHeight} radius='xl' />
				) : (
					seriesDiscover.map((series: SeriesType) => {
						return (
							<Carousel.Slide key={series.id}>
								<Series series={series} width='100%' height='auto' />
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
				<Title className={classes.mainHeading}>Series</Title>
				<Space h='xl' />
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Airing Today</Title>
				<Space h='xl' />
				<Carousel
					loop
					slideSize='40%'
					slideGap='xl'
					align='start'
					slidesToScroll={1}
				>
					{seriesAiringTodayStatus === 'loading' ||
					seriesAiringTodayFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : seriesAiringTodayError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						seriesAiringToday.map((series: SeriesType) => {
							return (
								<Carousel.Slide key={series.id}>
									<Series series={series} width='100%' height='auto' />
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
					{seriesTopRatedStatus === 'loading' ||
					seriesTopRatedFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : seriesTopRatedError ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : (
						seriesTopRated.map((series: SeriesType) => {
							return (
								<Carousel.Slide key={series.id}>
									<Series series={series} width='100%' height='auto' />
								</Carousel.Slide>
							);
						})
					)}
				</Carousel>
				<Space h='xl' />
			</Container>
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
			<Space h='xl' />
		</section>
	);
}

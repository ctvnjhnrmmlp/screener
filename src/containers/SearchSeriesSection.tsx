import Series from './Series';
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
import { SeriesType } from '@/types/series';
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

export default function SearchSeriesSection() {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const { classes } = useStyles();
	const skeletonHeight = 600;

	const {
		data: seriesDiscover,
		error: seriesDiscoverError,
		status: seriesDiscoverStatus,
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
		data: series,
		error: seriesError,
		status: seriesStatus,
		fetchStatus: seriesFetchStatus,
		refetch: refetchseries,
	} = useQuery({
		queryKey: ['series'],
		queryFn: async () => {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/search/tv`,
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

	const handleRefetchseries = () => {
		refetchseries();
	};

	return (
		<section>
			<Space h='xl' />
			<Container size='xl'>
				<Autocomplete
					ref={searchInputRef}
					icon={<BsSearch />}
					placeholder='Search Series'
					size='xl'
					data={[
						'Stranger Things',
						'Peaky Blinders',
						'Breaking Bad',
						'Money Heist',
					]}
					onKeyDown={(e) => {
						if (e.key === 'Enter') handleRefetchseries();
					}}
				/>
				<Space h='xl' />
				<Space h='xl' />
				<Title className={classes.subHeading}>Series</Title>
				<Space h='xl' />
				<Space h='xl' />
				<Container className={classes.container} size='xl'>
					{seriesStatus === 'loading' || seriesFetchStatus === 'fetching' ? (
						<Skeleton height={skeletonHeight} radius='xl' />
					) : seriesError ? (
						searchInputRef.current!.value.length <= 0 ? (
							<Text align='center' size='lg'>
								Please input a series.
							</Text>
						) : (
							<Text align='center' size='lg'>
								Series not found.
							</Text>
						)
					) : searchInputRef.current!.value.length === 0 ? (
						seriesDiscover.map((series: SeriesType) => {
							if (series.poster_path)
								return (
									<Series
										key={series.id}
										series={series}
										width={350}
										height={600}
									/>
								);
						})
					) : (
						series.map((series: SeriesType) => {
							if (series.poster_path)
								return (
									<Series
										key={series.id}
										series={series}
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

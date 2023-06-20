import Layout from '@/layouts/Layout';
import { SeriesType, SeriesProps } from '@/types/series';
import Link from 'next/link';
import {
	Container,
	Text,
	BackgroundImage,
	Button,
	createStyles,
	rem,
	Overlay,
	Title,
	Space,
	useMantineColorScheme,
} from '@mantine/core';

type getServerSidePropsType = {
	params: SeriesType;
};

const useStyles = createStyles((theme) => ({
	hero: {
		position: 'relative',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	backgroundImage: {
		height: '100vh',
	},
	container: {
		height: rem(700),
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'flex-start',
		paddingBottom: `calc(${theme.spacing.xl} * 4)`,
		zIndex: 1,
		position: 'relative',

		[theme.fn.smallerThan('sm')]: {
			height: rem(600),
			paddingBottom: `calc(${theme.spacing.xl} * 3)`,
		},
	},
	title: {
		color: theme.white,
		fontSize: rem(60),
		fontWeight: 900,
		lineHeight: 1.1,

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(40),
			lineHeight: 1.2,
		},

		[theme.fn.smallerThan('xs')]: {
			fontSize: rem(28),
			lineHeight: 1.3,
		},
	},
	description: {
		color: theme.white,
		maxWidth: 600,

		[theme.fn.smallerThan('sm')]: {
			maxWidth: '100%',
			fontSize: theme.fontSizes.sm,
		},
	},
	button: {
		marginTop: `calc(${theme.spacing.xl} * 1.5)`,

		[theme.fn.smallerThan('sm')]: {
			width: '100%',
		},
	},
}));

export default function Series({ series }: SeriesProps) {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const { classes } = useStyles();

	return (
		<Layout>
			<div className={classes.hero}>
				<BackgroundImage
					className={classes.backgroundImage}
					src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}
				>
					<Overlay opacity={0.65} zIndex={0} />
					<Container className={classes.container}>
						<Title className={classes.title}>{series.name}</Title>
						<Text className={classes.description} size='lg' italic>
							{series.tagline}
						</Text>
						<Space h='lg' />
						<Text className={classes.description} size='xl'>
							{series.overview}
						</Text>
						<Link href={series.homepage} target='_blank'>
							<Button
								size='md'
								className={classes.button}
								color={dark ? 'gray' : 'dark'}
							>
								Home
							</Button>
						</Link>
					</Container>
				</BackgroundImage>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params }: getServerSidePropsType) {
	const response = await fetch(
		`https://api.themoviedb.org/3/tv/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
	);
	const series = await response.json();

	return {
		props: {
			series,
		},
	};
}

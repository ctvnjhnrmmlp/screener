import {
	createStyles,
	Container,
	Title,
	Text,
	Anchor,
	useMantineColorScheme,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
	footerContainerContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: theme.spacing.xl,
		paddingBottom: theme.spacing.xl,
	},
}));

export default function Footer() {
	const { classes } = useStyles();
	const { colorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	return (
		<footer>
			<Container className={classes.footerContainerContent}>
				<Anchor
					href='https://ctvnjhnrmmlp.vercel.app'
					target='_blank'
					underline={false}
				>
					<Title order={3} color={dark ? '#FFFFFF' : '#0A0A0A'}>
						John Rommel Octaviano
					</Title>
				</Anchor>
				<Text>Screener. All Rights Reserved.</Text>
			</Container>
		</footer>
	);
}

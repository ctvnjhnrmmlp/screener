import Link from 'next/link';
import {
	Button,
	createStyles,
	Menu,
	useMantineColorScheme,
} from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';
import { RiMovie2Fill, RiSlideshow3Fill, RiMovieFill } from 'react-icons/ri';
import { MdMovie } from 'react-icons/md';

const useStyles = createStyles(() => ({
	menuContainer: {
		marginLeft: 'auto',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));

export default function TogglerMenu() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';
	const { classes } = useStyles();

	return (
		<Menu>
			<Menu.Target>
				<Button variant='filled' color={dark ? 'gray' : 'dark'}>
					Menu
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Actions</Menu.Label>
				<Menu.Item
					icon={dark ? <FaSun /> : <FaMoon />}
					onClick={() => toggleColorScheme()}
				>
					Change theme
				</Menu.Item>
				<Menu.Item icon={<RiMovie2Fill />}>
					<Link href='/' className={classes.link}>
						Browse movies
					</Link>
				</Menu.Item>
				<Menu.Item icon={<MdMovie />}>
					<Link href='/search-movies' className={classes.link}>
						Search movies
					</Link>
				</Menu.Item>
				<Menu.Item icon={<RiSlideshow3Fill />}>
					<Link href='/browse-series' className={classes.link}>
						Browse series
					</Link>
				</Menu.Item>
				<Menu.Item icon={<RiMovieFill />}>
					<Link href='/search-series' className={classes.link}>
						Search series
					</Link>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}

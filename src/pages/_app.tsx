import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		setCookie('mantine-color-scheme', nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}
		>
			<MantineProvider
				theme={{
					colorScheme,
					headings: {
						fontFamily: 'Inter',
					},
					colors: {
						dark: [
							'#FFFFFF',
							'#0A0A0A',
							'#FFFFFF',
							'#FFFFFF',
							'#0A0A0A',
							'#0A0A0A',
							'#0A0A0A',
							'#0A0A0A',
							'#0A0A0A',
							'#0A0A0A',
						],
					},
				}}
				withGlobalStyles
				withNormalizeCSS
			>
				<Component {...pageProps} />
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

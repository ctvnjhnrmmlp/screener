import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

type LayoutProps = {
	children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Head>
				<title>Screener</title>
				<link
					type='image/png'
					sizes='96x96'
					rel='icon'
					href='https://img.icons8.com/fluency/48/documentary.png'
				></link>
			</Head>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}

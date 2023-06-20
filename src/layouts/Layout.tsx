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
			</Head>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
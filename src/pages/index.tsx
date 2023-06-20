import Layout from '../layouts/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BrowseMovieSection from '@/containers/BrowseMovieSection';

const moviesQueryClient = new QueryClient();

export default function Home() {
	return (
		<Layout>
			<QueryClientProvider client={moviesQueryClient}>
				<BrowseMovieSection />
			</QueryClientProvider>
		</Layout>
	);
}

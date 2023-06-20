import Layout from '../layouts/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchMovieSection from '@/containers/SearchMovieSection';

const moviesQueryClient = new QueryClient();

export default function SearchMovies() {
	return (
		<Layout>
			<QueryClientProvider client={moviesQueryClient}>
				<SearchMovieSection />
			</QueryClientProvider>
		</Layout>
	);
}

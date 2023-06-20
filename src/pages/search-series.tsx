import Layout from '../layouts/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchSeriesSection from '@/containers/SearchSeriesSection';

const seriesQueryClient = new QueryClient();

export default function SearchMovies() {
	return (
		<Layout>
			<QueryClientProvider client={seriesQueryClient}>
				<SearchSeriesSection />
			</QueryClientProvider>
		</Layout>
	);
}

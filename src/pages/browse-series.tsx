import Layout from '../layouts/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BrowseSeriesSection from '../containers/BrowseSeriesSection';

const seriesQueryClient = new QueryClient();

export default function BrowseSeries() {
	return (
		<Layout>
			<QueryClientProvider client={seriesQueryClient}>
				<BrowseSeriesSection />
			</QueryClientProvider>
		</Layout>
	);
}

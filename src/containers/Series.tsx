import Link from 'next/link';
import { Card, Image } from '@mantine/core';
import { SeriesProps } from '@/types/series';

export default function Series({ series, width, height }: SeriesProps) {
	return (
		<Link href={`/series/${series.id}`}>
			<Card radius='xl'>
				<Card.Section>
					<Image
						src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}
						alt={`${series.name} poster`}
						width={width}
						height={height}
					/>
				</Card.Section>
			</Card>
		</Link>
	);
}

import Link from 'next/link';
import { Card, Image } from '@mantine/core';
import { MovieProps } from '@/types/movie';

export default function Movie({ movie, width, height }: MovieProps) {
	return (
		<Link href={`/movies/${movie.id}`}>
			<Card radius='xl'>
				<Card.Section>
					<Image
						src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
						alt={`${movie.title} poster`}
						width={width}
						height={height}
					/>
				</Card.Section>
			</Card>
		</Link>
	);
}

import React from 'react';
import Hero from '../components/Hero';

export default function Media(): React.JSX.Element {
	return (
		<>
			<Hero title="News & Media" description="Latest News, Events & Downloads" />
			<section className="container prose">
				<p>No events available at the moment.</p>
			</section>
		</>
	);
} 
import React from 'react';
import Hero from '../components/Hero';

export default function Classifieds(): React.JSX.Element {
	return (
		<>
			<Hero title="Explore Our Classifieds" description="Discover top deals and opportunities." />
			<section className="container prose">
				<p>Browse the latest listings and uncover great opportunities now!</p>
			</section>
		</>
	);
} 
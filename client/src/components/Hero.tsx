import React from 'react';

type HeroProps = {
	tagline?: string;
	title: string;
	description?: string;
	ctaText?: string;
	ctaHref?: string;
};

export default function Hero({ tagline, title, description, ctaText, ctaHref = '#' }: HeroProps): React.JSX.Element {
	return (
		<section className="hero">
			<div className="container">
				{tagline ? <p className="hero-tagline">{tagline}</p> : null}
				<h1 className="hero-title">{title}</h1>
				{description ? <p className="hero-desc">{description}</p> : null}
				{ctaText ? (
					<a className="btn btn-primary" href={ctaHref}>{ctaText}</a>
				) : null}
			</div>
		</section>
	);
} 
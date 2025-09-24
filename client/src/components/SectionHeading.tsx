import React from 'react';

type SectionHeadingProps = {
	title: string;
	subtitle?: string;
	center?: boolean;
};

export default function SectionHeading({ title, subtitle, center }: SectionHeadingProps): React.JSX.Element {
	return (
		<header className={center ? 'section-heading center' : 'section-heading'}>
			{subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
			<h2 className="section-title">{title}</h2>
		</header>
	);
} 
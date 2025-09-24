import React from 'react';
import SectionHeading from './SectionHeading';

const leaders = [
	{ name: 'K. SIDDIK', role: 'Chief Patron' },
	{ name: 'AKBAR SIDDIQUE', role: 'Patron' },
	{ name: 'A. P. ABDUL SALAM', role: 'Chairman' },
	{ name: 'IBRAHIM KUNNIL', role: 'Vice Chairman' }
];

export default function Leadership(): React.JSX.Element {
	return (
		<section className="container leadership">
			<SectionHeading title="Meet Our Leadership" subtitle="Guiding Lights Behind Our Vision" center />
			<div className="leader-grid">
				{leaders.map((l) => (
					<div key={l.name} className="leader-card">
						<div className="leader-avatar" aria-hidden="true" />
						<h4>{l.name}</h4>
						<p>{l.role}</p>
					</div>
				))}
			</div>
		</section>
	);
} 
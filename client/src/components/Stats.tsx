import React from 'react';

export default function Stats(): React.JSX.Element {
	return (
		<section className="stats">
			<div className="container stats-grid">
				<div className="stat"><div className="stat-value">0K</div><div className="stat-label">Strong Members</div></div>
				<div className="stat"><div className="stat-value">0+</div><div className="stat-label">Social Projects</div></div>
				<div className="stat"><div className="stat-value">0+</div><div className="stat-label">Edu Scholarships</div></div>
				<div className="stat"><div className="stat-value">0+</div><div className="stat-label">Medical Assistance</div></div>
			</div>
		</section>
	);
} 
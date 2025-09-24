import React from 'react';
import Hero from '../components/Hero';

export default function Initiatives(): React.JSX.Element {
	return (
		<>
			<Hero title="Social Projects & Initiatives" description="Wide Range of Support Programs for You and Your Family" />
			<section className="container cards">
				<div className="card-grid">
					{[
						'Family Benefit Scheme',
						'Kidney Dialysis Centre',
						'Medical Assistance Program',
						'Educational Scholarship',
						'Hajj & Umrah Programs',
						'Early Detection Center',
						'Housing Improvement Program',
						'Members Welfare Scheme'
					].map((title) => (
						<div key={title} className="card">
							<h3>{title}</h3>
							<a href="#" className="more">More</a>
						</div>
					))}
				</div>
			</section>
		</>
	);
} 
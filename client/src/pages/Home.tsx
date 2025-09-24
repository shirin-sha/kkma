import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Leadership from '../components/Leadership';
import NewsList from '../components/NewsList';
import Calendars from '../components/Calendars';

export default function Home(): React.JSX.Element {
	return (
		<>
			<Hero
				tagline="Building a Stronger Future Together"
				title="Empowering the Community Since 2001"
				description="KKMA is dedicated to enhancing the lives of its members and the wider community."
				ctaText="Learn More"
				ctaHref="#initiatives"
			/>

			<section className="features container">
				<div className="feature-grid">
					<div className="feature">
						<h3>Community Support</h3>
						<p>Helping in Times of Need</p>
					</div>
					<div className="feature">
						<h3>Social Welfare</h3>
						<p>Difference Through Service</p>
					</div>
					<div className="feature">
						<h3>Volunteer Programs</h3>
						<p>Join MAGNET Volunteer Group</p>
					</div>
				</div>
			</section>

			<Stats />

			<section id="initiatives" className="container split">
				<div>
					<h2>Social Projects & Initiatives</h2>
					<p>Our projects are designed to address critical community needs from healthcare to education.</p>
					<a className="btn" href="#">Read More</a>
				</div>
				<div>
					<h2>MAGNET Volunteer Group</h2>
					<p>Be a part of a compassionate network offering aid and comfort to patients across Kuwait.</p>
					<a className="btn" href="#">Read More</a>
				</div>
			</section>

			<section className="container cards">
				<h2>Comprehensive Membership Benefits</h2>
				<div className="card-grid">
					{[
						'Housing Improvement',
						'Early Detection Center',
						'Medical Assistance Program',
						'Educational Scholarship',
						'Members Welfare Scheme',
						'Family Benefit Scheme',
						'KKMA Investment Club',
						'Community Welfare Activities'
					].map((title) => (
						<div key={title} className="card">
							<h3>{title}</h3>
							<a href="#" className="more">More</a>
						</div>
					))}
				</div>
			</section>

			<Calendars />
			<Leadership />
			<NewsList />
		</>
	);
} 
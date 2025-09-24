import React from 'react';
import SectionHeading from './SectionHeading';

export default function Calendars(): React.JSX.Element {
	return (
		<section className="calendars">
			<div className="container">
				<SectionHeading title="Our Schedules & Routines" subtitle="Our Calendars" center />
				<div className="calendar-tabs">
					<button className="btn">Upcoming Events</button>
					<button className="btn">Upcoming Meetings</button>
					<button className="btn">Featured Events</button>
				</div>
				<div className="calendar-empty">There is no events or events expires</div>
			</div>
		</section>
	);
} 
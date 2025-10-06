import React from 'react';
import SectionHeading from './SectionHeading';

const news = [
	{ date: '07 Sep ’25', title: 'കെ.കെ.എം എ. വയനാട് ജില്ലാ വിദ്യാഭ്യാസ അവാർഡ് വിതരണം ചെയ്തു.' },
	{ date: '31 Aug ’25', title: 'ഇഷ്‌ഖേ റസൂൽ 2025: പ്രവാചക സ്നേഹത്തിന്റെ നിറവിൽ ഒരു സായാഹ്നം.' },
	{ date: '27 Aug ’25', title: 'മുനീർ കോടി സാഹിബ്‌ പ്രസ്ഥാനവീഥിയിലെ കർമ്മയോഗി : കെ കെ. എം എ' }
];

export default function NewsList(): React.JSX.Element {
	return (
		<section className="container news">
			<SectionHeading title="Latest From Our Newsroom" subtitle="News & Blog" center />
			<div className="news-grid">
				{news.map((n) => (
					<article key={n.title} className="news-card">
						<div className="news-meta">{n.date}</div>
						<h4 className="news-title">{n.title}</h4>
						<a className="more" href="#">Read</a>
					</article>
				))}
			</div>
		</section>
	);
} 
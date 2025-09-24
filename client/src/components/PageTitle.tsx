import React from 'react';

type BreadcrumbItem = {
	label: string;
	url?: string;
};

type PageTitleProps = {
	title: string;
	backgroundImageUrl: string;
	breadcrumb?: BreadcrumbItem[];
};

export default function PageTitle({ title, backgroundImageUrl, breadcrumb = [] }: PageTitleProps): React.JSX.Element {
	return (
		<section className="page-title" style={{ backgroundImage: `url('${backgroundImageUrl}')` }}>
			<div className="auto-container">
				<div className="content-box">
					<div className="title centred">
						<h1>{title}</h1>
					</div>
					{breadcrumb.length > 0 ? (
						<ul className="bread-crumb clearfix">
							{breadcrumb.map((item, idx) => (
								<li key={`${item.label}-${idx}`}>
									{item.url ? <a href={item.url}>{item.label}</a> : item.label}
								</li>
							))}
						</ul>
					) : null}
				</div>
			</div>
		</section>
	);
} 
// Styles
import './website-card.scss';

// Dependencies
import type { Website } from '../../types/webtimeData.type';

// Assets
import genericWebsiteIcon from '../../assets/generic-website-icon.svg';

// Dependencies
import * as React from 'react';

function WebsiteCard({ website }: { website: Website }) {

	// Variables
	let gradientColors: string[] = ['#e3734a, #ed9657, #f3af5e', '#577DC6, #7789D7, #938FE4', '#F25FA1, #F4647E, #F96D63'];
	let progressBarColor: string;
	let name: string = website.url.replace('.com', '').replace('.net', '').replace('.org', '').replace('.ca', '').replace('.to', '').replace('edu', '').replace('www.', '')
	let icon = website.icon ? website.icon : genericWebsiteIcon

	// Captialize the first letter in the website name
	name = name[0].toUpperCase() + name.slice(1);

	// Determine gradient color of progress bar depending on the percentage
	if (website.percentage) {
		if (website.percentage < 30) {
			progressBarColor = gradientColors[1];
		} else if (website.percentage > 30 && website.percentage < 60) {
			progressBarColor = gradientColors[0];
		} else {
			progressBarColor = gradientColors[2];
		}
	} else {
		progressBarColor = ''
	}
	const progressBarStyle = {
		'--gradient': `linear-gradient(${progressBarColor})`,
		'--width': `${website.percentage}%`
	};

	return (
		<div className="website-card">
			<div className="website-card__body">
				<img className="website-card__logo" src={icon} alt="website logo" />
				<div className="website-card__description">
					<p className="website-card__website-name">{name}</p>
					<p className="website-card__text website-card__text--grey">{website.percentage}% of Screen time</p>
				</div>
			</div>
			<div className="website-card__website-time">
				<p className="website-card__text website-card__text--grey">
					Total:{' '}
					<span className="website-card__text website-card__text--bold">{website.durationFormatted}</span>
				</p>
				<div className="website-card__progress-bar" style={progressBarStyle as React.CSSProperties} />
			</div>
		</div>
	);
}

export default WebsiteCard;

// Styles
import './main.scss';

// Assets
import refreshIcon from '../../assets/refresh-icon.svg';

// Dependencies
import { useState } from 'react';
import type { Website, WebtimeData } from '../../types/webtimeData.type';

// Components
import WebsiteCard from '../WebsiteCard/WebsiteCard';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Main({ webtimeData, setWebtimeData, screentimeData, setScreentimeData }: { webtimeData: Website[], setWebtimeData: Function, screentimeData: number, setScreentimeData: Function}) {

	// States
	// Counter to represent how many times the user has clicked the 'show more' button on the list of websites
	const [showMoreCounter, setShowMoreCounter] = useState(1);
	// Boolean value to represent when the confirmation modal is displayed
	const [isModalDisplayed, setIsModalDisplayed] = useState(false);

	// Functions
	// Calculates total website browsing activity
	const calculateTotalWebtime = (arr: WebtimeData): number => {
		if (arr.length === 0) {
			return 0;
		}

		return arr[0].duration + calculateTotalWebtime(arr.slice(1));
	};

	// Formats time from seconds to string in (00h 00min) format
	const secondsToTimeLong = (seconds: number) => {
		let h = seconds / 3600 < 1 ? `0h` : `${Math.floor(seconds / 3600)}h`;
		let m = `${Math.floor(((seconds / 3600) % 1) * 60)}min`;

		let time = h === '' ? `${m}` : `${h} ${m}`;

		return time;
	};

	// Formats time in seconds to string in (00:00) format
	const secondsToTimeShort = (seconds: number) => {
		let h: string | number = Math.floor(seconds / 3600);
		let m: string | number = Math.floor(((seconds / 3600) % 1) * 60);

		if (h === 0) {
			h = '00';
		} else if (h < 10) {
			h = `0${h}`;
		}

		if (m < 10) {
			m = `0${m}`;
		}

		let time: string = `${h}:${m}`;

		return time;
	};

	// Clickhandler that increments the showmoreCounter state
	const handleShowMoreClick = () => {
		setShowMoreCounter((prevState) => prevState + 1);
	};

	// Clickhandler that toggles the confirmation modal
	const showConfirmationModal = (boolean: boolean) => {
		boolean ? setIsModalDisplayed(true) : setIsModalDisplayed(false)
	}

	// Sort webtimeData by duration (descending order)
	webtimeData.sort(function (a: Website, b: Website) {
		return b.duration - a.duration;
	});

	// Variables
	// Filter webtimeData to exclude websites that have a duration time less than 1 min
	let webtimeDataFiltered = (function () {
		let filteredWebtimeData = webtimeData.filter((website) => website.duration >= 60).filter((website) => website.url !== 'newtab' && website.url !== 'history')
		return filteredWebtimeData;
	})();
	// Total duration of webtime in seconds
	let totalSeconds = calculateTotalWebtime(webtimeDataFiltered);
	// Total duration of webtime formatted as string (e.g., '3h 25min')
	let totalWebtimeLong = secondsToTimeLong(screentimeData);
	// Subset of webtimeData array
	let webtimeDataSliced = (function () {
		let length = showMoreCounter * 5;
		return webtimeDataFiltered.slice(0, length);
	})();
	// Today's date
	let currentDate = new Date().toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: '2-digit', weekday: 'short' })

	return (
		<main className="main">
			<section className="main__today">
				<h2 className="main__sub-header">Today's Screen time</h2>
				<p className="main__total-time">{totalWebtimeLong}</p>
				<p className="main__sub-header main__date">{currentDate}</p>
			</section>

			{
				isModalDisplayed ?<> <ConfirmationModal setIsModalDisplayed={setIsModalDisplayed} setWebtimeData={setWebtimeData} setScreentimeData={setScreentimeData} /> <div className="main__background-overlay"></div> </>: null
			}

			<section className="main__activity-table">
				<h2 className="main__sub-header main__sub-header--black">Website Activity</h2>
				<div className="main__activity-table-icon" onClick={() => showConfirmationModal(true)}>
					<img className="main__activity-table-refresh-icon" src={refreshIcon} alt="refresh icon"/>
				</div>
				<div className="main__website-list">
					{webtimeDataSliced.map((website, index) => {
						let totalWebtimeShort = secondsToTimeShort(website.duration);
						website.percentage = Math.floor(website.duration / totalSeconds * 100);
						website.durationFormatted = totalWebtimeShort;
						return <WebsiteCard website={website} key={index} />;
					})}
					<div className="main__activity-table-cta" onClick={handleShowMoreClick}>
						show more
					</div>
				</div>
			</section>
		</main>
	);
}



export default Main;

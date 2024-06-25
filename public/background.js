// SECTION: Variables
let isActive = false;
let currentWebsites = [];
let websiteTimes = [];
let totalScreenTime = 0;
let openWindowIDs = [];

let today = new Date();
let currentTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

// SECTION: Functions

// get windowIds of ALL open windows
function getOpenWindowIds() {
	chrome.windows.getAll({}, (windows) => {
		openWindowIDs = windows.filter((window) => window.state != 'minimized').map((window) => window.id);
	});
}

// calculates website times on ALL open windows

function calculateWebsiteTimes() {
	getOpenWindowIds();

	chrome.tabs.query({ active: true }, (tabs) => {
		currentWebsites = tabs.filter((tab) => openWindowIDs.includes(tab.windowId)).map((tab) => tab);
		console.log(currentWebsites);
	});

	for (let currentWebsite of currentWebsites) {
		let currentWebsiteUrl = currentWebsite.url.split('/')[2];
		let currentWebsiteIconUrl = currentWebsite.favIconUrl;

		if (websiteTimes.some((website) => Object.values(website).includes(currentWebsiteUrl))) {
			let index = websiteTimes.findIndex((website) => website.url === currentWebsiteUrl);
			websiteTimes[index].duration++;
		} else {
			websiteTimes.push({
				url: currentWebsiteUrl,
				duration: 0,
				icon: currentWebsiteIconUrl
			});
		}
	}
}

// Calculates total web time
function calculateTotalScreenTime() {
	totalScreenTime++;
}

// Runs a function at a specified time of the day
function runAtSpecificTimeOfDay(hour, minutes, func) {
	const twentyFourHours = 86400000;
	const now = new Date();
	let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now;
	if (eta_ms < 0) {
		eta_ms += twentyFourHours;
	}
	setTimeout(function() {
		//run once
		func();
		// run every 24 hours from now on
		setInterval(func, twentyFourHours);
	}, eta_ms);
}

// SECTION: Event Listeners

// Fires when the active tab in a window changes.
chrome.tabs.onActivated.addListener((activeInfo) => {
	// Set isActive to true
	isActive = true;
	console.log(currentTime, 'inside onActivated!');
});
// Fires when the focused window changes but more importantly lets us know when all chrome windows have lost focus and the user is inactive
chrome.windows.onFocusChanged.addListener((windowId) => {
	if (windowId === chrome.windows.WINDOW_ID_NONE) {
		isActive = false;
		console.log(currentTime, 'browser became inactive');
	} else {
		console.log(currentTime, 'browser became active');
		isActive = true;
	}
});
// Send website times object when you recieve a request from the chrome extension context
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.cmd === 'getWebsiteTimes') {
		sendResponse(websiteTimes);
	} else if (request.cmd === 'getTotalScreenTime') {
		sendResponse(totalScreenTime);
	} else if (request.cmd === 'clearWebsiteTimes') {
		chrome.storage.local.set({ websiteTimes: [] });
		websiteTimes = [];
		sendResponse(websiteTimes);
	} else if (request.cmd === 'clearScreenTime') {
		chrome.storage.local.set({ totalScreenTime: 0 });
		totalScreenTime = 0;
		sendResponse(totalScreenTime);
	}
});

// SECTION: Execution

// Get websiteTimes from local storage
chrome.storage.local.get([ 'websiteTimes' ]).then((data) => {
	if (data.websiteTimes.length !== 0) {
		websiteTimes = data.websiteTimes;
	}
});

// Get totalScreenTime from local storage
chrome.storage.local.get([ 'totalScreenTime' ]).then((data) => {
	if (data.totalScreenTime) {
		console.log(`totalScreenTime is`, data.totalScreenTime);
		totalScreenTime = data.totalScreenTime;
	}
});

// Initialize chrome storage local - date
chrome.storage.local.get('date').then((data) => {
	let dateNow = new Date().toLocaleDateString('en-us', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric'
	});

	if (!data.date) {
		chrome.storage.local.set({ date: dateNow }).then(() => {});
	} else {
		if (data.date !== dateNow) {
			// Update date object in local storage with dateNow
			console.log('updating the date', data.date, dateNow);
			chrome.storage.local.set({ date: dateNow });

			// Reset websiteTimes in local storage with empty array
			chrome.storage.local.set({ websiteTimes: [] });

			// Reset totalScreenTime in local storage as 0
			chrome.storage.local.set({ totalScreenTime: 0 });

			// Update websiteTimes local variable with empty array
			websiteTimes = [];
			totalScreenTime = 0;
		}
	}
});

// Set interval to update website tracking times every second
setInterval(() => {
	if (isActive) {
		calculateWebsiteTimes();
		calculateTotalScreenTime();
	}
}, 1000);

// Set interval to update local storage for website times every minute (to prevent exceeding hourly limit for updating local storage)
setInterval(() => {
	chrome.storage.local.set({ websiteTimes: websiteTimes }).then(() => {});
	chrome.storage.local.set({ totalScreenTime: totalScreenTime }).then(() => {});
}, 60000);

// Reset local storage at midnight

runAtSpecificTimeOfDay(0, 0, () => {
	let dateNow = new Date().toLocaleDateString('en-us', {
		year: 'numeric',
		month: '2-digit',
		day: 'numeric'
	});
	websiteTimes = [];
	totalScreenTime = 0;
	chrome.storage.local.set({ websiteTimes: websiteTimes });
	chrome.storage.local.set({ date: dateNow });
	chrome.storage.local.set({ totalScreenTime: totalScreenTime });
});

console.log('version 1.02');

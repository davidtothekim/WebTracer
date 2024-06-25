// Styles
import './confirmation-modal.scss';

function ConfirmationModal({
	setIsModalDisplayed,
	setWebtimeData,
	setScreentimeData
}: {
	setIsModalDisplayed: Function;
	setWebtimeData: Function;
	setScreentimeData: Function;
}) {
	// Functions

	const clearData = () => {
		chrome.runtime.sendMessage({ cmd: 'clearWebsiteTimes' }, (data) => {
			setWebtimeData(data);
		});

		chrome.runtime.sendMessage({ cmd: 'clearScreenTime' }, (data) => {
			setScreentimeData(data);
		});

		setIsModalDisplayed(false);
	};

	return (
		<div className="confirmation-modal">
			<h3 className="confirmation-modal__header">Delete today's progress?</h3>
			<p className="confirmation-modal__text">This action can't be undone.</p>
			<div className="confirmation-modal__footer">
				<p
					className="confirmation-modal__button confirmation-modal__button--cancel"
					onClick={() => setIsModalDisplayed(false)}
				>
					Cancel
				</p>
				<p className="confirmation-modal__button confirmation-modal__button--confirm" onClick={clearData}>
					Delete
				</p>
			</div>
		</div>
	);
}

export default ConfirmationModal;

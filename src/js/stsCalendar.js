/**
 * © 2025 SoftAndTech. All rights reserved.
 * Licensed under the SoftAndTech Proprietary License.
 * See LICENSE file for details.
 */

class stsCalendar {
	constructor(elementId, bookedDates = [], options = {
		previousDateSelection: false,
		multipleSelection: false,
		RandomSelection: false,
		WeekStartFrom: 'Sun', // for week start
		monthsToShow: 1, // New option to show multiple months
		errmessage: null
	}) {
		this.element = document.getElementById(elementId);
		if (!this.element) throw new Error(`Element with id "${elementId}" not found`);

		this.currentDate = new Date();
		this.bookedDates = bookedDates;
		this.selectedDates = new Set();
		this.previousDateSelection = options.previousDateSelection || false;
		this.multipleSelection = options.multipleSelection || false;
		this.RandomSelection = options.RandomSelection || false;
		this.WeekStartFrom = options.WeekStartFrom || 'Sun';
		this.monthsToShow = options.monthsToShow || 1;
		this.startDate = null;
		this.endDate = null;
		this.tempEndDate = null;
		this.errmessage = options.errmessage || 'Selected Dates are locked'
		this.createMessageContainer();

		this.render();
	}

	createMessageContainer() {
		this.msg_container = document.createElement('div');
		this.msg_container.className = 'msg-container';
		this.msg_container.style.display = 'none';

		this.CalDispMsg = document.createElement('span');
		this.CalDispMsg.className = 'Cal-Disp-Msg';
		this.msg_container.appendChild(this.CalDispMsg);
		this.element.appendChild(this.msg_container);
	}

	render() {
		this.element.innerHTML = '';
		this.element.appendChild(this.msg_container); // Re-add message container

		const calendarContainer = document.createElement('div');
		calendarContainer.className = 'calendar-months-container';

		const daysOfWeek = this.getDaysOfWeek();
		const standardDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		for (let m = 0; m < this.monthsToShow; m++) {
			const displayDate = new Date(this.currentDate);
			displayDate.setMonth(displayDate.getMonth() + m);

			const wrapper = document.createElement('div');
			wrapper.className = 'calendar-wrapper';

			// Header
			const header = document.createElement('div');
			header.className = 'calendar-header';
			const monthDisplay = document.createElement('span');
			monthDisplay.textContent = displayDate.toLocaleDateString('en-US', {
				month: 'long',
				year: 'numeric'
			});

			if (m === 0) {
				const prevButton = document.createElement('button');
				prevButton.textContent = '<';
				prevButton.addEventListener('click', () => this.changeMonth(-1));
				header.appendChild(prevButton);
			}

			header.appendChild(monthDisplay);

			if (m === this.monthsToShow - 1) {
				const nextButton = document.createElement('button');
				nextButton.textContent = '>';
				nextButton.addEventListener('click', () => this.changeMonth(1));
				header.appendChild(nextButton);
			}

			wrapper.appendChild(header);

			// Body
			const body = document.createElement('div');
			body.className = 'calendar-body';

			// Week Header
			const weekHeader = document.createElement('div');
			weekHeader.className = 'week-header';
			daysOfWeek.forEach(day => {
				const dayElement = document.createElement('div');
				dayElement.className = 'week-day';
				dayElement.textContent = day;
				weekHeader.appendChild(dayElement);
			});
			body.appendChild(weekHeader);

			const days_grid = document.createElement('div');
			days_grid.className = 'days-grid';

			// Calculate the first day index relative to WeekStartFrom
			const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1);
			const actualStartDayIndex = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
			const firstDayIndex = daysOfWeek.indexOf(standardDays[actualStartDayIndex]);

			// Empty cells before the first day
			for (let i = 0; i < firstDayIndex; i++) {
				const emptyCell = document.createElement('div');
				emptyCell.className = 'empty-day';
				days_grid.appendChild(emptyCell);
			}

			const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();

			for (let day = 1; day <= daysInMonth; day++) {
				const dayElement = document.createElement('div');
				dayElement.className = 'day';
				dayElement.textContent = day;

				const year = displayDate.getFullYear();
				const month = String(displayDate.getMonth() + 1).padStart(2, '0');
				const dayStr = String(day).padStart(2, '0');
				const dateStr = `${year}-${month}-${dayStr}`;

				dayElement.setAttribute('data-date', dateStr);

				const todayStr = new Date().toLocaleDateString('en-CA');
				const isPreviousDate = this.previousDateSelection && dateStr < todayStr;
				const isBookedDate = this.bookedDates.includes(dateStr);
				const isToday = dateStr === todayStr;

				if (isPreviousDate) dayElement.classList.add('disabled');
				if (isBookedDate) dayElement.classList.add('booked');
				if (isToday) dayElement.classList.add('date_today');

				if (this.selectedDates.has(dateStr)) {
					dayElement.classList.add('date_selected');
				}

				if (this.multipleSelection && this.startDate && this.endDate) {
					const selectedDate = new Date(dateStr);
					if (selectedDate >= this.startDate && selectedDate <= this.endDate) {
						dayElement.classList.add('date_selected');
					}
				}

				if (!isPreviousDate && !isBookedDate) {
					dayElement.addEventListener('click', () => this.handleDateClick(dayElement, dateStr));
					dayElement.addEventListener('mouseover', () => this.handleDateHover(dateStr));
				}

				days_grid.appendChild(dayElement);
			}

			body.appendChild(days_grid);
			wrapper.appendChild(body);
			calendarContainer.appendChild(wrapper);
		}

		this.element.appendChild(calendarContainer);
	}


	getDaysOfWeek() {
		const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const startIdx = allDays.indexOf(this.WeekStartFrom);
		if (startIdx === -1) return allDays.slice();
		return [...allDays.slice(startIdx), ...allDays.slice(0, startIdx)];
	}

	handleDateHover = (dateStr) => {
		if (this.startDate && !this.endDate) {
			this.tempEndDate = new Date(dateStr);
			this.applyHoverEffect();
		}
	}

	applyHoverEffect() {
		const allDayElements = Array.from(this.element.querySelectorAll('.day'));
		allDayElements.forEach(day => day.classList.remove('hiddenselect'));

		if (this.startDate && this.tempEndDate) {
			const tempStart = new Date(this.startDate);
			const tempEnd = new Date(this.tempEndDate);

			const rangeStart = tempStart < tempEnd ? tempStart : tempEnd;
			const rangeEnd = tempStart < tempEnd ? tempEnd : tempStart;

			for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
				const dateStr = this.formatDate(d);
				const day = allDayElements.find(el => el.getAttribute('data-date') === dateStr);
				if (day) {
					day.classList.add('hiddenselect');
				}
			}
		}
	}

	changeMonth(offset) {
		this.currentDate.setDate(1);
		this.currentDate.setMonth(this.currentDate.getMonth() + offset);
		this.render();
	}

	handleDateClick(dayElement, dateStr) {
		const selectedDate = new Date(dateStr);

		if (this.bookedDates.includes(dateStr)) {
			this.resetWithError("Selected date is locked.");
			return;
		}

		if (this.multipleSelection && !this.RandomSelection) {
			if (!this.startDate || (this.startDate && this.endDate)) {
				this.reset();
				this.startDate = selectedDate;
			} else {
				this.endDate = selectedDate;

				const rangeStart = this.startDate < this.endDate ? this.startDate : this.endDate;
				const rangeEnd = this.startDate > this.endDate ? this.startDate : this.endDate;

				if (this.isLockedDateInRange(rangeStart, rangeEnd)) {
					this.resetWithError(this.errmessage);
					return;
				}

				this.startDate = rangeStart;
				this.endDate = rangeEnd;
				this.updateSelectedRange();
			}
		} else if (this.multipleSelection && this.RandomSelection) {
			if (this.selectedDates.has(dateStr)) {
				this.selectedDates.delete(dateStr);
				dayElement.classList.remove('date_selected');
			} else {
				this.selectedDates.add(dateStr);
				dayElement.classList.add('date_selected');
			}
		} else {
			this.selectedDates.clear();
			this.selectedDates.add(dateStr);
			this.render();
		}

	 
	}

	isLockedDateInRange(start, end) {
		for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
			if (this.bookedDates.includes(this.formatDate(d))) {
				return true;
			}
		}
		return false;
	}

	resetWithError(message) {
		this.reset();
		this.CalDispMsg.textContent = message;
		this.msg_container.style.display = 'block';
		this.msg_container.classList.add('show');

		setTimeout(() => {
			this.msg_container.style.display = 'none';
			this.msg_container.classList.remove('show');
		}, 3000); // 3 seconds
	}

	updateSelectedRange() {
		if (!this.startDate || !this.endDate) return;

		this.selectedDates.clear();
		const rangeStart = new Date(this.startDate);
		const rangeEnd = new Date(this.endDate);

		for (let d = new Date(rangeStart); d <= rangeEnd; d.setDate(d.getDate() + 1)) {
			const dateStr = this.formatDate(d);
			this.selectedDates.add(dateStr);
		}

		this.render();
	}

	reset() {
		this.selectedDates.clear();
		this.startDate = null;
		this.endDate = null;
		this.tempEndDate = null;
		this.render();
	}

	formatDate(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	getSelectedDates() {
		const selectedDatesArray = Array.from(this.selectedDates).sort();
		// console.log("Selected dates in getSelectedDates:", selectedDatesArray);
		return selectedDatesArray;
	}
}
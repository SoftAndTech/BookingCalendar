# stsCalendar

A lightweight, customizable JavaScript calendar widget with support for:

- Multi-month display
- Single and multiple date selection modes
- Disabled booked dates
- Customizable week start day (Sunday or Monday)
- Previous date selection control
- Clean, modern UI (requires custom CSS)

---

## Demo

Check out the `index.html` demo included in the package for an example of how to use `stsCalendar` in your project.

---

## Features

- Show 1 or more months in a grid layout
- Highlight booked/unavailable dates
- Allow single or multiple date selection (including ranges)
- Optionally disable selection of past dates
- Easily get selected dates as an array of `YYYY-MM-DD` strings
- Customizable start day of the week (Sunday or Monday)
- Simple to initialize with booked dates and options

---

## Installation

Just include the `stsCalendar.js` module in your project:


<script type="module" src="stsCalendar.js"></script>


Or import it into your JavaScript modules:

import { stsCalendar } from './stsCalendar.js';

Include the accompanying CSS to style the calendar:

<link rel="stylesheet" href="css/stsCalendar.css" />

## Usage

    Create a container element in your HTML:

    <div id="myCalendar"></div>

    Initialize the calendar in your JavaScript:

    const calendar = new stsCalendar('myCalendar', [
    '2025-05-20', 
    '2025-05-22'
    ], {
    previousDateSelection: true,
    multipleSelection: true,
    WeekStartFrom: 'Mon',
    monthsToShow: 2
    });

        Access selected dates:

    const selectedDates = calendar.getSelectedDates();
    console.log(selectedDates); // Array of selected date strings


## Options
Option	                Type	    Default	    Description

previousDateSelection	Boolean	    true	    Allow selection of past dates or not
multipleSelection	    Boolean	    false	    Enable multiple date selection (range mode)
RandomSelection	        Boolean	    false	    Allow random date selection (non-contiguous)
WeekStartFrom	        String	    'Sun'	    Set week start day: 'Sun' or 'Mon'
monthsToShow	        Number	    1	        Number of months to display side-by-side

## Styling

Customize the look by editing the css/stsCalendar.css file. It includes styles for:

    Calendar container and grid

    Weekday headers

    Date cells (normal, booked, selected, disabled)

    Hover and active states

## License

MIT License

## Author

SoftAndTech — wwww.softandtech.co.in

Contribution

Feel free to open issues or submit pull requests for improvements or bug fixes.


## Contact

    If you have questions or need help, open an issue or contact me at softandtech.sol@gmail.com
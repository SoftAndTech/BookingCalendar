# stsCalendar

A lightweight, customizable JavaScript calendar widget built for modern web applications.

Supports:

- Multi-month grid display
- Booked/unavailable date disabling
- Single, range, and random date selection
- Week start control (Sunday/Monday)
- Previous date selection toggle
- Minimal, clean UI with customizable styles

---

## 🧪 Demo

Run the included `index.html` file in the `dist/demo` folder to preview and test `stsCalendar`.

---

## ⚙️ Installation

Install via NPM:

```
npm install github:SoftAndTech/BookingCalendar
```

ℹ️ During installation, the package detects if your project is a Laravel app and will automatically copy required files to public/js/softandtech and public/css/softandtech.

## 📁 File Locations

| File                           | Description                    |
| ------------------------------ | ------------------------------ |
| `dist/js/stsCalendar.js`       | Main calendar JavaScript class |
| `dist/css/stsCalendar.min.css` | Base styling for the calendar  |

## 🔧 Platform-specific Setup

### ✅ Laravel (Auto-Configured)

    When used in a Laravel project (with artisan file), the package will auto-copy files to:
 

    public/js/softandtech/stsCalendar.js
    public/css/softandtech/stsCalendar.min.css

 
### Include in Blade template:
    <link rel="stylesheet" href="{{ asset('css/softandtech/stsCalendar.min.css') }}">
    <script type="module" src="{{ asset('js/softandtech/stsCalendar.js') }}"></script>

# ⚛️ React / Vue / Angular (Manual Import)
  No auto-copy occurs. You'll need to import the files manually from node_modules.

Example (React or Vite):

```

    import { stsCalendar } from 'booking-calendar/dist/js/stsCalendar.js';
    import 'booking-calendar/dist/css/stsCalendar.min.css';

```

Use a ref or id on your container:

``` 

    <div class="calendarContainer">
        <div class="calendar" id="Mycalendar"></div>
    </div>
    
    useEffect(() => {
      const cal = new stsCalendar('Mycalendar', [], {
        monthsToShow: 2,
      });
    }, []);
```

### 🌐 Static HTML / Plain PHP

```

    <link rel="stylesheet" href="node_modules/@softandtech/booking-calendar/dist/css/stsCalendar.min.css">
    <script type="module" src="node_modules/@softandtech/booking-calendar/dist/js/stsCalendar.js"></script>

    <div class="calendarContainer">
        <div class="calendar" id="Mycalendar"></div>
    </div>
    
    <script type="module">
      import { stsCalendar } from './node_modules/@softandtech/booking-calendar/dist/js/stsCalendar.js';
    
      const calendar = new stsCalendar('Mycalendar', ['2025-05-20', '2025-05-22'], {
        previousDateSelection: true,
        multipleSelection: true,
        WeekStartFrom: 'Mon',
        monthsToShow: 2
      });
    
      console.log(calendar.getSelectedDates());
    </script>


```



## 🛠️ Options

| Option                  | Type    | Default | Description                                   |
| ----------------------- | ------- | ------- | --------------------------------------------- |
| `previousDateSelection` | Boolean | `true`  | Allow selecting dates before today            |
| `multipleSelection`     | Boolean | `false` | Enable selecting multiple dates in a sequence |
| `RandomSelection`       | Boolean | `false` | Allow non-contiguous date selection           |
| `WeekStartFrom`         | String  | `'Sun'` | Start week on `'Sun'` or `'Mon'`              |
| `monthsToShow`          | Number  | `1`     | Number of months to show side-by-side         |


## 🎨 Styling

All styles are in stsCalendar.min.css. You can:

    Customize colors and spacing

    Add hover/active effects

    Theme the calendar to match your UI

Main classes include:

    .sts-calendar – Wrapper

    .sts-date-cell – Day cell

    .booked, .selected, .disabled – Status markers

## 📝 License

MIT License


## 👤 Author

SoftAndTech — www.softandtech.co.in

## 🤝 Contributions

Pull requests, suggestions, and bug reports are welcome!

## 📩 Contact

Need help or customization?

📧 softandtech.sol@gmail.com


---

Let me know if you also want:

- Markdown version of the demo page for GitHub Preview.
- A custom NPM build or Webpack-ready export.
- Laravel Mix/Vite plugin instructions.


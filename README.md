# stsCalendar v2.0.0

A lightweight, customizable JavaScript calendar widget built for modern web applications especiallly for laravel projects.

Supports:

- Multi-month grid display
- Booked/unavailable date disabling with custom messages
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
    <link rel="stylesheet" href="/css/softandtech/stsCalendar.min.css"> 
    <script src="/js/softandtech/stsCalendar.js"></script>   

# ⚛️ React / Vue / Angular (Manual Import)
  No auto-copy occurs. You'll need to import the files manually from node_modules.
 

Use a ref or id on your container:

``` 

    `   <div class="calander-container">
            <div id="calendar" class="calendar"></div>
            <div class="calendar-legend">
                <div class="legend-item">
                    <div class="legend-box legend-booked"></div> Already Booked
                </div>
                <div class="legend-item">
                    <div class="legend-box legend-selected"></div> Selected Date
                </div>
                <div class="legend-item">
                    <div class="legend-box legend-today"></div> Today
                </div>
                <div class="legend-item">
                    <div class="legend-box legend-disabled"></div> Disabled
                </div>
            </div>
        </div>
    
     <script>
        document.addEventListener("DOMContentLoaded", function () {
            const bookedDates = ['2025-06-10', '2025-06-15', '2025-06-16'];
            const calendarOptions = {
                previousDateSelection: true,
                multipleSelection: true,
                monthsToShow: 2,
                errmessage: 'Selected range contains unavailable dates.',
            };

            const calendar = new stsCalendar('calendar', bookedDates, calendarOptions); 
            
            <!-- Check the console to view the value returns -->
            document.getElementById('calendar').addEventListener('click', () => {
                console.log(calendar.getSelectedDates()); 
            });
        });
    </script>
```

### 🌐 Static HTML / Plain PHP

copy and paste both files from booking-calendar/dist/ to your required folders and include it inside your project header

```
    <link rel="stylesheet" href="/css/softandtech/stsCalendar.min.css"> 
    <script src="/js/softandtech/stsCalendar.js"></script>  

```

## 🛠️ Options

| Option                  | Type    | Default | Description                                   |
| ----------------------- | ------- | ------- | --------------------------------------------- |
| `previousDateSelection` | Boolean | `true`  | Allow selecting dates before today            |
| `multipleSelection`     | Boolean | `false` | Enable selecting multiple dates in a sequence |
| `RandomSelection`       | Boolean | `false` | Allow non-contiguous date selection           |
| `WeekStartFrom`         | String  | `'Sun'` | Start week on `'Sun'` or `'Mon'`              |

## 🎨 Styling

All styles are in stsCalendar.min.css. You can:

    Customize colors and spacing

    Add hover/active effects

    Theme the calendar to match your UI 

## 📝 License

⚠️ This software is proprietary and intended for internal use only.
Unauthorized use, distribution, or modification is strictly prohibited.


## 👤 Author

SoftAndTech — www.softandtech.co.in
Akhil Vijay and Sreejith P

## 🤝 Contributions

Pull requests, suggestions, and bug reports are welcome only with authors permission!

## 📩 Contact

Need help or customization?

📧 softandtech.sol@gmail.com


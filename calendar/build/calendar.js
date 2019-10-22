var Day = (function () {
    function Day(number, dayOfWeek, parent) {
        this.number = number;
        this.dayOfWeek = dayOfWeek;
        this.parent = parent;
        this.create();
    }
    Day.prototype.getNumber = function () {
        return this.number;
    };
    Day.prototype.getDayofWeek = function () {
        var dayOfWeek;
        switch (this.dayOfWeek) {
            case 0:
                dayOfWeek = 'So';
                break;
            case 1:
                dayOfWeek = 'Mo';
                break;
            case 2:
                dayOfWeek = 'Di';
                break;
            case 3:
                dayOfWeek = 'Mi';
                break;
            case 4:
                dayOfWeek = 'Do';
                break;
            case 5:
                dayOfWeek = 'Fr';
                break;
            case 6:
                dayOfWeek = 'Sa';
                break;
        }
        return dayOfWeek;
    };
    Day.prototype.getParent = function () {
        return this.parent;
    };
    Day.prototype.createItem = function (text, css) {
        var itemElement = document.createElement('div'), textNode = document.createTextNode(text);
        itemElement.classList.add(css);
        itemElement.appendChild(textNode);
        return itemElement;
    };
    Day.prototype.create = function () {
        var element = document.createElement('div');
        element.classList.add('day');
        element.appendChild(this.createItem(this.getNumber().toString(), 'number'));
        element.appendChild(this.createItem(this.getDayofWeek(), 'day_of_week'));
        this.getParent().appendChild(element);
    };
    return Day;
}());
var Calendar = (function () {
    function Calendar() {
        this.setActiveDate();
        this.render();
    }
    Calendar.prototype.getDaysPerMonth = function () {
        var tmpDate = new Date(this.getActiveDate().getFullYear(), this.getActiveDate().getMonth() + 1, 0);
        return tmpDate.getDate();
    };
    Calendar.prototype.setActiveDate = function (dateString) {
        this.activeDate = typeof dateString === 'string' ? new Date(dateString) : new Date();
    };
    Calendar.prototype.getActiveDate = function () {
        return this.activeDate;
    };
    Calendar.prototype.navButton = function (type) {
        var _this = this;
        var button = document.createElement('button');
        button.innerHTML = type === 'prev' ? 'vorheriger' : 'naechster';
        button.addEventListener('click', function () {
            _this.wrapper.innerHTML = "";
            _this.getActiveDate().setMonth((type === 'prev' ? _this.getActiveDate().getMonth() - 1 : _this.getActiveDate().getMonth() + 1));
            _this.renderDays();
        });
        return button;
    };
    Calendar.prototype.render = function () {
        document.body.appendChild(this.navButton('prev'));
        document.body.appendChild(this.navButton('next'));
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('calendar');
        this.renderDays();
        document.body.appendChild(this.wrapper);
    };
    Calendar.prototype.renderDays = function () {
        this.renderInfo();
        for (var i = 1; i <= this.getDaysPerMonth(); i++) {
            var tmpDate = new Date(this.getActiveDate().getFullYear(), this.getActiveDate().getMonth(), i);
            var day = new Day(i, tmpDate.getDay(), this.wrapper);
        }
    };
    Calendar.prototype.getMonthname = function (number) {
        var monthname = '';
        switch (number) {
            case 0:
                monthname = 'Januar';
                break;
            case 1:
                monthname = 'Februar';
                break;
            case 2:
                monthname = 'Maerz';
                break;
            case 3:
                monthname = 'April';
                break;
            case 4:
                monthname = 'Mai';
                break;
            case 5:
                monthname = 'Juni';
                break;
            case 6:
                monthname = 'Juli';
                break;
            case 7:
                monthname = 'August';
                break;
            case 8:
                monthname = 'September';
                break;
            case 9:
                monthname = 'Oktober';
                break;
            case 10:
                monthname = 'November';
                break;
            case 11:
                monthname = 'Dezember';
                break;
        }
        return monthname;
    };
    Calendar.prototype.renderInfo = function () {
        var box = document.createElement('div'), text = document.createTextNode(this.getMonthname(this.getActiveDate().getMonth()) + ' - ' + this.getActiveDate().getFullYear());
        box.classList.add('info');
        box.appendChild(text);
        this.wrapper.appendChild(box);
    };
    return Calendar;
}());
var calendar = new Calendar();

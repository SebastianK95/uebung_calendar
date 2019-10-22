class Day {

    constructor(public number: number, public dayOfWeek: number, public parent: HTMLDivElement) {
        this.create();
    }

    private getNumber(): number {
        return this.number;
    }

    private getDayofWeek(): string {
        let dayOfWeek;
        switch(this.dayOfWeek) {
            case 0: dayOfWeek = 'So';
            break;
            case 1: dayOfWeek = 'Mo';
            break;
            case 2: dayOfWeek = 'Di';
            break;
            case 3: dayOfWeek = 'Mi';
            break;
            case 4: dayOfWeek = 'Do';
            break;
            case 5: dayOfWeek = 'Fr';
            break;
            case 6: dayOfWeek = 'Sa';
            break;
        }
        return dayOfWeek;
    }

    private getParent(): HTMLDivElement {
        return this.parent;
    }

    private createItem(text: string, css: string): HTMLDivElement {
        let itemElement = document.createElement('div'), textNode = document.createTextNode(text);
        itemElement.classList.add(css);
        itemElement.appendChild(textNode);
        return itemElement;
    }

    private create() {
        let element = document.createElement('div');
        element.classList.add('day');
        element.appendChild(this.createItem(this.getNumber().toString(), 'number'));
        element.appendChild(this.createItem(this.getDayofWeek(), 'day_of_week'));
        this.getParent().appendChild(element);
    }

}

class Calendar {

    private activeDate: Date;

    private wrapper: HTMLDivElement;

    constructor() {
        this.setActiveDate();
        this.render();
    }

    private getDaysPerMonth(): number {
        let tmpDate = new Date(this.getActiveDate().getFullYear(), this.getActiveDate().getMonth() + 1, 0);
        return tmpDate.getDate();
    }

    private setActiveDate(dateString?: string) {
        this.activeDate = typeof dateString === 'string' ? new Date(dateString) : new Date();
    }
    private getActiveDate(): Date {
        return this.activeDate;
    }

    private navButton(type: string): HTMLButtonElement {
        let button = document.createElement('button');
        button.innerHTML = type === 'prev' ? 'vorheriger' : 'naechster';
        button.addEventListener('click', () => {
            this.wrapper.innerHTML = "";
            this.getActiveDate().setMonth((type === 'prev' ? this.getActiveDate().getMonth() - 1 : this.getActiveDate().getMonth() + 1));
            this.renderDays();
        });
        return button;
    }

    private render() {
        document.body.appendChild(this.navButton('prev'));
        document.body.appendChild(this.navButton('next'));

        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('calendar');

        this.renderDays();

        document.body.appendChild(this.wrapper);
    }

    private renderDays() {
        this.renderInfo();

        for (let i = 1; i <= this.getDaysPerMonth(); i++) {
            let tmpDate = new Date(this.getActiveDate().getFullYear(), this.getActiveDate().getMonth(), i);
            let day = new Day(i, tmpDate.getDay(), this.wrapper);
        }
    }

    private getMonthname(number: number): string {
        let monthname = '';
        switch(number) {
            case 0: monthname = 'Januar';
            break;
            case 1: monthname = 'Februar';
            break;
            case 2: monthname = 'Maerz';
            break;
            case 3: monthname = 'April';
            break;
            case 4: monthname = 'Mai';
            break;
            case 5: monthname = 'Juni';
            break;
            case 6: monthname = 'Juli';
            break;
            case 7: monthname = 'August';
            break;
            case 8: monthname = 'September';
            break;
            case 9: monthname = 'Oktober';
            break;
            case 10: monthname = 'November';
            break;
            case 11: monthname = 'Dezember';
            break;
        }
        return monthname;
    }

    private renderInfo() {
        let box = document.createElement('div'), text = document.createTextNode(this.getMonthname(this.getActiveDate().getMonth()) + ' - ' + this.getActiveDate().getFullYear());
        box.classList.add('info');
        box.appendChild(text);
        this.wrapper.appendChild(box);
    }
}

let calendar = new Calendar();
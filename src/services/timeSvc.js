// Credit: https://github.com/github/time-elements/
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const pad = num => `0${num}`.slice(-2);

function strftime(time, formatString) {
  const day = time.getDay();
  const date = time.getDate();
  const month = time.getMonth();
  const year = time.getFullYear();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();
  return formatString.replace(/%([%aAbBcdeHIlmMpPSwyYZz])/g, (_arg) => {
    let match;
    const modifier = _arg[1];
    switch (modifier) {
      case '%':
      default:
        return '%';
      case 'a':
        return weekdays[day].slice(0, 3);
      case 'A':
        return weekdays[day];
      case 'b':
        return months[month].slice(0, 3);
      case 'B':
        return months[month];
      case 'c':
        return time.toString();
      case 'd':
        return pad(date);
      case 'e':
        return date;
      case 'H':
        return pad(hour);
      case 'I':
        return pad(strftime(time, '%l'));
      case 'l':
        return hour === 0 || hour === 12 ? 12 : (hour + 12) % 12;
      case 'm':
        return pad(month + 1);
      case 'M':
        return pad(minute);
      case 'p':
        return hour > 11 ? 'PM' : 'AM';
      case 'P':
        return hour > 11 ? 'pm' : 'am';
      case 'S':
        return pad(second);
      case 'w':
        return day;
      case 'y':
        return pad(year % 100);
      case 'Y':
        return year;
      case 'Z':
        match = time.toString().match(/\((\w+)\)$/);
        return match ? match[1] : '';
      case 'z':
        match = time.toString().match(/\w([+-]\d\d\d\d) /);
        return match ? match[1] : '';
    }
  });
}

let dayFirst = null;
let yearSeparator = null;

// Private: Determine if the day should be formatted before the month name in
// the user's current locale. For example, `9 Jun` for en-GB and `Jun 9`
// for en-US.
//
// Returns true if the day appears before the month.
function isDayFirst() {
  if (dayFirst !== null) {
    return dayFirst;
  }

  if (!('Intl' in window)) {
    return false;
  }

  const options = { day: 'numeric', month: 'short' };
  const formatter = new window.Intl.DateTimeFormat(undefined, options);
  const output = formatter.format(new Date(0));

  dayFirst = !!output.match(/^\d/);
  return dayFirst;
}

// Private: Determine if the year should be separated from the month and day
// with a comma. For example, `9 Jun 2014` in en-GB and `Jun 9, 2014` in en-US.
//
// Returns true if the date needs a separator.
function isYearSeparator() {
  if (yearSeparator !== null) {
    return yearSeparator;
  }

  if (!('Intl' in window)) {
    return true;
  }

  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const formatter = new window.Intl.DateTimeFormat(undefined, options);
  const output = formatter.format(new Date(0));

  yearSeparator = !!output.match(/\d,/);
  return yearSeparator;
}

// Private: Determine if the date occurs in the same year as today's date.
//
// date - The Date to test.
//
// Returns true if it's this year.
function isThisYear(date) {
  const now = new Date();
  return now.getUTCFullYear() === date.getUTCFullYear();
}

class RelativeTime {
  constructor(date) {
    this.date = date;
  }

  toString() {
    const ago = this.timeElapsed();
    return ago || `on ${this.formatDate()}`;
  }

  timeElapsed() {
    const ms = new Date().getTime() - this.date.getTime();
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);
    if (ms < 0) {
      return 'just now';
    } else if (sec < 45) {
      return 'just now';
    } else if (sec < 90) {
      return 'a minute ago';
    } else if (min < 45) {
      return `${min} minutes ago`;
    } else if (min < 90) {
      return 'an hour ago';
    } else if (hr < 24) {
      return `${hr} hours ago`;
    } else if (hr < 36) {
      return 'a day ago';
    } else if (day < 30) {
      return `${day} days ago`;
    }
    return null;
  }

  formatDate() {
    let format = isDayFirst() ? '%e %b' : '%b %e';
    if (!isThisYear(this.date)) {
      format += isYearSeparator() ? ', %Y' : ' %Y';
    }
    return strftime(this.date, format);
  }
}

export default {
  format(time) {
    return time && new RelativeTime(new Date(time)).toString();
  },
};

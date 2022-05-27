import {Temporal, toTemporalInstant} from "@js-temporal/polyfill";

Date.prototype.toTemporalInstant = toTemporalInstant;

//do not recommend. Very slow method
export function fromStringToInstantPlainDate(date) {
    return new Date(date)
        .toTemporalInstant()
        .toZonedDateTimeISO('UTC')
        .toPlainDate();
}

//absolutely do not recommend to anyone
export function fromStringToInstantPlainDateTime(date) {
    return new Date(date)
        .toTemporalInstant()
        .toZonedDateTimeISO('UTC')
        .toPlainTime();
}

export function toTemporalPlainDate(date, currentSmallestUnit) {
    return Temporal.Instant.from(date)
        .toZonedDateTimeISO(date)
        .toPlainDateTime()
        .round({smallestUnit: currentSmallestUnit, roundingMode: "floor"});
}

export function toNormalFormat(duration) {
    return `${duration.days !== 0 ? duration.days + ' days' : ''}
    ${duration.hours !== 0 ? duration.hours + ' hours' : ''}
    ${duration.minutes !== 0 ? duration.minutes + ' minutes' : ''}`
}

export function sortByDate(date) {
    return date
        ?.sort((row1, row2) => Temporal.Instant.compare(row1.from, row2.from));
}

export function filterForMainPage(rows, currentDate, currentCity, currentRoom) {
    const rowsByDate = rows
        ? rows.filter((rowByDate) =>
            Temporal.PlainDate.compare(rowByDate[0], currentDate) === 0)
        : null

    if (currentCity === '' && currentRoom === '') {
        return rowsByDate;

    } else if (currentCity !== '' && currentRoom === '') {
        return rowsByDate.map((events) => [events[0], events[1].filter((event) =>
            event?.room?.city === currentCity)]);

    } else if (currentCity === '' && currentRoom !== '') {
        return rowsByDate.map((events) => [events[0], events[1].filter((event) =>
            event?.room?.roomNumber === Number(currentRoom))]);

    } else if (currentCity !== '' && currentRoom !== '') {
        return rowsByDate.map((events) => [events[0], events[1].filter((event) =>
            event?.room?.roomNumber === Number(currentRoom)
            && event?.room?.city === currentCity)]);
    }
}

export function makeGroupsByDate(group) {
    return group?.reduce((groups, row) => {
        const dateFrom = toTemporalPlainDate(row?.from, 'hour');
        const dateFromRounded = dateFrom.toString();

        if (!groups[dateFromRounded]) {
            groups[dateFromRounded] = [];
        }
        groups[dateFromRounded].push(row);

        return groups;
    }, {});
}

// converts Temporal date&time to a string "2019-12-17T15:00:00.281Z" and etc.
export function convertTemporalToRequestFormat(date, time, toOrFrom = 'from') {
    const dateStr = `${date.year}-${toTwoDigitNumber(date.month)}-${toTwoDigitNumber(date.day)}`;
    const timeStr = `${toTwoDigitNumber(time[toOrFrom].hour)}:${toTwoDigitNumber(time[toOrFrom].minute)}:` +
        `${toTwoDigitNumber(time[toOrFrom].second)}.${toTwoDigitNumber(time[toOrFrom].millisecond)}Z`;
    return `${dateStr}T${timeStr}`;
}

// converts a string "12:0" to "12:00", "5:15" to "05:15" and etc.
export function convertTemporalToUsualTime(time) {
    return `${toTwoDigitNumber(time.hour)}:${toTwoDigitNumber(time.minute)}`;
}

export function toTwoDigitNumber(number) {
    return String(number).length === 1 ? `0${number}` : `${number}`;
}

// finds upcoming event
export function findUpcomingDate(events) {
    if (events !== null && events.length > 0){
        const date = Temporal.Now.plainDateISO();
        const time = Temporal.Now.plainTimeISO();

        const dateStr = `${date.year}-${toTwoDigitNumber(date.month)}-${toTwoDigitNumber(date.day)}`;
        const timeStr = `${toTwoDigitNumber(time.hour)}:${toTwoDigitNumber(time.minute)}:` +
            `${toTwoDigitNumber(time.second)}.${toTwoDigitNumber(time.millisecond)}Z`;

        const finalString = `${dateStr}T${timeStr}`;

        const futureEvents = events.filter(
            event =>
                Temporal.Instant.compare(Temporal.Instant.from(finalString), Temporal.Instant.from(event.from)) === -1);

        const sortedFutureEvents = sortByDate(futureEvents);
        let upcomingEventTime = '';
        if (sortedFutureEvents.length > 0){
            upcomingEventTime = sortedFutureEvents[0].from;
        }

        return sortedFutureEvents.filter(event => event.from === upcomingEventTime);
    }
    return [];
}

// 2022-04-23T04:00:00.000Z
export function convertEventTimeToNormalDate(date) {
    const yearMonthDay = date.substring(0, 10);
    const hourMinutes = date.substring(11, 16);
    return `${hourMinutes}, ${yearMonthDay}`;
}
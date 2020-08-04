<template lang="pug">
    .date
        #dayOfMonth {{dayOfMonth}}
        #month {{month}}
        #year {{year}}
        #dayOfWeek {{dayOfWeek}}
</template>

<script>
export default {
    data() {
        const date = new Date(Date.now());
        return {
            date: date.toDateString(),
            dayOfWeek: date.toLocaleString('et-EE', { weekday: 'long' }),
            dayOfMonth: date.getUTCDate(),
            month: date.toLocaleString('et-EE', { month: 'short' }),
            year: date.getFullYear(),
        };
    },
};
</script>

<style>
.date {
    display: grid;
    grid-template-columns: 20px 70px auto 100px;
    grid-template-rows: repeat(2, auto);
    column-gap: 11px;
    row-gap: 3px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    justify-content: stretch;
}

#dayOfMonth, #dayOfWeek {
    align-self: center;
}

#dayOfMonth {
    grid-column: 1;
    grid-row: 1 / span 2;
    font-size: 41px;
}

#month {
    font-size: 13px;
    grid-column: 2;
    grid-row: 1;
    align-self: end;
}

#year {
    font-size: 15px;
    grid-column: 2;
    grid-row: 2;
    align-self: start;
}

#dayOfWeek {
    font-size: 17px;
    grid-column: 4;
    grid-row: 1 / span 2;
    justify-self: end;
}
</style>

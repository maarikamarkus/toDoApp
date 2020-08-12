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
        return {
            date: '',
            dayOfWeek: '',
            dayOfMonth: '',
            month: '',
            year: '',
        };
    },

    mounted() {
        this.updateDate();
    },

    methods: {
        updateDate() {
            const date = new Date(Date.now());
            this.date = date.toDateString();
            this.dayOfWeek = date.toLocaleString('et-EE', { weekday: 'long' });
            this.dayOfMonth = date.getUTCDate();
            this.month = date.toLocaleString('et-EE', { month: 'short' });
            this.year = date.getFullYear();
            setTimeout(this.updateDate, 60000);
        },
    },
};
</script>

<style>
.date {
    display: grid;
    grid-template-columns: min-content 70px auto 100px;
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

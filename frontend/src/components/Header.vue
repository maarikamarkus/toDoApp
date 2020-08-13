<template lang="pug">
    .date
        #dayOfMonth {{dayOfMonth}}
        #month {{month}}
        #year {{year}}
        #dayOfWeek {{dayOfWeek}}
        font-awesome-icon(icon="sign-out-alt")#icon
        #langChoiceET ET 
        #langChoiceEN EN
</template>

<script>
export default {
    props: ['locale'],

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
            this.dayOfWeek = date.toLocaleString(this.locale, { weekday: 'long' });
            this.dayOfMonth = date.getUTCDate();
            this.month = date.toLocaleString(this.locale, { month: 'short' });
            this.year = date.getFullYear();
            setTimeout(this.updateDate, 60000);
        },
    },
};
</script>

<style>
.date {
    display: grid;
    grid-template-columns: min-content 60px 350px 25px 25px 25px;
    grid-template-rows: repeat(2, auto);
    column-gap: 11px;
    row-gap: 3px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    justify-content: stretch;
    margin-bottom: 40px;
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
    grid-column: 3;
    grid-row: 1 / span 2;
    justify-self: center;
}

#icon, #langChoiceET, #langChoiceEN {
    transition: color 0.5s ease;
}

#icon:hover, #langChoiceET:hover, #langChoiceEN:hover {
    color: #87dfd6;
}

#icon {
    font-size: 20px;
    grid-column: 6;
    grid-row: 1;
    place-self: end end;
}

#langChoiceET {
    font-size: 15px;
    grid-column: 4;
    grid-row: 1;
    place-self: end end;
}

#langChoiceEN {
    font-size: 15px;
    grid-column: 5;
    grid-row: 1;
    place-self: end end;
}
</style>

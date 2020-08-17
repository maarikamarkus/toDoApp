<template lang="pug">
    .date
        #dayOfMonth {{dayOfMonth}}
        #month {{month}}
        #year {{year}}
        #dayOfWeek {{dayOfWeek}}
        font-awesome-icon(icon="sign-out-alt")#icon(v-on:click="logout()")
        Language.lang(@chooseLang="updateDate")
</template>

<script>
import Language from './Language.vue';

export default {
    components: {
        Language,
    },

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
            this.dayOfWeek = date.toLocaleString(this.$root.$i18n.locale, { weekday: 'long' });
            this.dayOfMonth = date.getDate();
            this.month = date.toLocaleString(this.$root.$i18n.locale, { month: 'short' });
            this.year = date.getFullYear();
            setTimeout(this.updateDate, 60000);
        },

        logout() {
            this.$emit('logout');
        },
    },
};
</script>

<style>
.date {
    display: grid;
    /*grid-template-columns: min-content 60px 335px 30px 30px 25px;*/
    grid-template-columns: min-content min-content auto min-content min-content min-content;
    grid-template-rows: repeat(2, 17px);
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
    font-size: 43px;
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

#icon {
    transition: color 0.5s ease;
    cursor: pointer;
}

#icon:hover {
    color: var(--accent-color);
}

#icon {
    font-size: 20px;
    grid-column: 6;
    grid-row: 1;
    place-self: end end;
}

.date .lang {
    grid-column: 4 / span 2;
    grid-row: 1;
    place-self: end end;
    padding: 0 0 0 0;
}
</style>

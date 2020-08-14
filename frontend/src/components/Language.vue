<template lang="pug">
    .lang
        #langChoiceET(v-on:click="chooseLang('et')" 
                    :class="'choice ' + langClass('et')") ET
        #langChoiceEN(v-on:click="chooseLang('en')" 
                    :class="'choice ' + langClass('en')") EN    
</template>
<script>
export default {
    methods: {
        chooseLang(lang) {
            this.$root.$i18n.locale = lang;
            window.localStorage.setItem('lang', lang);
            this.$emit('chooseLang');
        },

        langClass(lang) {
            return this.$root.$i18n.locale === lang ? 'chosen' : '';
        },
    },
};
</script>
<style>
.lang {
    display: inline-block;
}

.choice {
    display: inline;
    cursor: pointer;
    font-size: 15px;
    transition: color 0.5s ease;
}

.choice:hover {
    color: #87dfd6;
}

#langChoiceET {
    margin-right: 9px;
}

.choice.chosen {
    border-bottom: 1px solid #086972;
}
</style>

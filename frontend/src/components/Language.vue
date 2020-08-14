<template lang="pug">
    .lang
        #langChoiceET(v-on:click="chooseLang('et')" 
                    :class="'choice ' + (lang === 'et' ? 'chosen' : '')") ET
        #langChoiceEN(v-on:click="chooseLang('en')" 
                    :class="'choice ' + (lang === 'en' ? 'chosen' : '')") EN    
</template>
<script>
export default {
    data() {
        return {
            lang: 'et',
            locale: 'et-EE',
        };
    },

    methods: {
        chooseLang(lang) {
            if (lang === 'et') {
                this.$root.$i18n.locale = 'et';
                this.lang = 'et';
            } else if (lang === 'en') {
                this.$root.$i18n.locale = 'en';
                this.lang = 'en';
            } else {
                this.$root.$i18n.locale = 'et';
                this.lang = 'et';
            }
            this.$emit('chooseLang');
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

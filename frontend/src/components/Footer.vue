<template lang="pug">
    .footer
        #button(v-on:click="showAddItem()" :class="buttonClasses") +
        input(
            v-model="newItem"
            type="text"
            id="addItem"
            :class="fieldClasses"
            @keypress.enter="addItem()"
            @focusout="hideAddItem()"
            ref="inputField")
</template>

<script>
export default {
    props: ['items', 'state'],

    data() {
        return {
            newItem: '',
        };
    },

    methods: {
        showAddItem() {
            this.$emit('showAddItem');
            this.$nextTick(() => this.$refs.inputField.focus());
        },

        hideAddItem() {
            this.$emit('hideAddItem');
        },

        async addItem() {
            const newItem = { title: this.newItem, state: false };

            if (this.newItem !== '') {
                this.$emit('addItem', newItem);
            }
            this.newItem = '';
        },

        onkeydown(e) {
            if ((e.code === 'Minus' || e.code === 'NumpadAdd') && this.state === 'list') {
                e.preventDefault();
                this.showAddItem();
            }
        },
    },

    created() {
        document.onkeydown = this.onkeydown;
    },

    computed: {
        fieldClasses() {
            return this.state === 'list' ? 'hidden' : '';
        },
        buttonClasses() {
            return this.state === 'edit' ? 'hidden' : '';
        },
    },
};
</script>

<style>
.footer {
    text-align: center;
    margin-top: 24px;
}

.footer .hidden {
    display: none !important;
}

.footer #button {
    cursor: pointer;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 37px;
    border: none;
    border-radius: 100%;
    background-color: #fbfd8a;
    transition: box-shadow 0.65s ease;
    display: inline-block;
}

.footer #button:hover {
    box-shadow: 0px 0px 10px 2px var(--main-color);
}

.footer input {
    color: var(--main-color);
}

#addItem {
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    width: 450px;
}
</style>

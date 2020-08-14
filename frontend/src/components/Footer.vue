<template lang="pug">
    .footer
        #button(v-on:click="showAddItem()" :class="buttonClasses") +
        input(
            v-model="newItem"
            type="text"
            id="addItem"
            :class="fieldClasses"
            @keypress.enter="addItem()"
            ref="inputField")
</template>

<script>
export default {
    props: ['items'],

    data() {
        return {
            newItem: '',
            state: 'list',
        };
    },

    methods: {
        showAddItem() {
            this.state = 'edit';
            this.$nextTick(() => this.$refs.inputField.focus());
        },

        async addItem() {
            const newItem = { title: this.newItem, state: false };

            this.state = 'list';
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
    font-size: 37px;
    border: none;
    border-radius: 100%;
    background-color: #fbfd8a;
    transition: box-shadow 0.65s ease;
    display: inline-block;
}

.footer #button:hover {
    box-shadow: 0px 0px 10px 2px #086972;
}

.footer input {
    color: #086972;
}

#addItem {
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    width: 450px;
}
</style>

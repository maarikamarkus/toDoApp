<template lang="pug">
    .items
        ul(v-for="item in sortedItems" :key="item.id")
            .listRow
                .delete(v-on:click="deleteItem(item.id)") ×
                li(:class="item.state ? 'checked' : ''"
                    v-on:click="markDoneUndone(item.id)")
                    | {{item.title}}
                    transition(name="lineThrough")
                        span.lineThrough(v-if="item.state")
                div(:class="item.state ? 'checkBubble checked' : 'checkBubble'"
                    v-on:click="markDoneUndone(item.id)")
</template>

<script>
export default {
    props: ['items'],

    methods: {
        markDoneUndone(id) {
            this.$emit('markDoneUndone', id);
        },

        deleteItem(id) {
            this.$emit('deleteItem', id);
        },
    },

    computed: {
        sortedItems() {
            return this.items.concat().sort((a, b) => {
                if (!a.state && b.state) {
                    return -1;
                }
                return 0;
            });
        },
    },
};
</script>

<style>
.listRow {
    cursor: pointer;
    padding: 5px;
    /*width: 600px;*/
}

.items {
    min-height: 123px;
}

.items ul {
    padding-inline-start: 0px;
}

.items ul li {
    color: black;
    list-style: none;
    display: inline-block;
    position: relative;
    font-size: 23px;
    transition: color 1s ease;
}

.items .checked {
    color: rgb(150, 150, 150);
}

.items li .lineThrough {
    background-color: rgb(150, 150, 150);
    bottom: 0;
    display: block;
    height: 1px;
    margin: auto 0;
    position: absolute;
    top: 0;
    width: 100%;
}

.items li .lineThrough-enter-active,
.items li .lineThrough-leave-active {
    transition: width 1s ease;
}

.items li .lineThrough-enter,
.items li .lineThrough-leave-to {
    width: 0;
}

.delete {
    font-size: 25px;
    line-height: 15px;
    display: inline-block;
    width: 15px;
    height: 15px;
    top: 0px;
    margin-right: 11px;
    position: relative;
    border:1px solid #086972;
    border-radius: 100%;
    color: #086972;
}

.checkBubble {
    border:1px solid #086972;
    border-radius: 100%;
    width: 15px;
    height: 15px;
    float: right;
    top: 5px;
    position: relative;
}

.delete, .checkBubble {
    transition: all 0.75s ease;
}

.checkBubble:hover, .delete:hover {
    box-shadow: 0px 0px 10px 2px #086972;
}

.items .checkBubble.checked{
    background-color: #87dfd6;
    border-color: #87dfd6;
}

</style>

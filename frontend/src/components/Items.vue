<template lang="pug">
    .items
        ul(v-for="item in sortedItems" :key="item.id")
            .listRow
                .bubbleOuter
                    .bubble.delete(v-on:click="deleteItem(item.id)") ×
                li(:class="item.state ? 'checked' : ''"
                    v-on:click="markDoneUndone(item.id)")
                    span.title 
                        | {{item.title}}
                        transition(name="lineThrough")
                            span.lineThrough(v-if="item.state")
                .bubbleOuter
                    div(:class="'bubble checkBubble ' + (item.state ? 'checked' : '')"
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
    padding-bottom: 5px;
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 31px;
}

.items {
    min-height: 123px;
}

.items ul {
    padding-inline-start: 0px;
}

.items ul li {
    color: #086972;
    list-style: none;
    display: flex;
    flex: 1 1 auto;
    font-size: 23px;
    transition: color 1s ease;
    min-width: 0;
}

.title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
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

.bubble {
    width: 15px;
    height: 15px;
    border: 1px solid #086972;
    border-radius: 100%;
}

.bubbleOuter {
    display: flex;
    flex: 0 0 15px;
    height: 100%;
    align-items: center;
}

.delete {
    font-size: 25px;
    line-height: 18px;
    margin-right: 11px;
    margin-left: 5px;
    color: #086972;
}

.checkBubble {
    margin-left: 11px;
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

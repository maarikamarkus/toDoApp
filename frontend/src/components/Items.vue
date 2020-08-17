<template lang="pug">
    .items
        ul(v-for="item in sortedItems" :key="item.id")
            .listRow
                .bubbleOuter
                    .bubble.delete(v-on:click="deleteItem(item.id)") ×
                li(:class="item.state ? 'checked' : ''"
                    v-on:click="markDoneUndone(item.id)")
                    popper(class="popperOuter" trigger="hover" 
                            :delay-on-mouse-over="600"
                            :options="popperOptions")
                        .popper {{item.title}}
                        span.title(slot="reference")
                            | {{item.title}}
                            transition(name="lineThrough")
                                span.lineThrough(v-if="item.state")
                .bubbleOuter
                    div(:class="'bubble checkBubble ' + (item.state ? 'checked' : '')"
                        v-on:click="markDoneUndone(item.id)")
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

const popperOptions = { 
    placement: 'top', 
    modifiers: {
        computeStyle: {
            gpuAcceleration: false,
        },
    },
};

export default {
    props: ['items'],

    components: {
        popper: Popper,
    },

    data() {
        return {
            popperOptions,
        };
    },

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
    color: var(--main-color);
    list-style: none;
    display: flex;
    flex: 1 1 auto;
    font-size: 23px;
    transition: color 1s ease;
    min-width: 0;
}

.items ul li .popperOuter {
    display: flex;
    width: 100%;
}

.items ul li .popperOuter .popper {
    color: var(--main-color);
    font-size: 23px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 200;
}

.items ul li .title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    transition: color 0.3s ease;
}

.title:hover {
    color: var(--sec-text-color);
}

.items .checked {
    color: var(--sec-text-color);
}

.items li .lineThrough {
    background-color: var(--sec-text-color);
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
    border: 1px solid var(--main-color);
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
    line-height: 15px;
    margin-right: 11px;
    margin-left: 5px;
    color: var(--main-color);
}

.checkBubble {
    margin-left: 11px;
}

.delete, .checkBubble {
    transition: all 0.75s ease;
}

.checkBubble:hover, .delete:hover {
    box-shadow: 0px 0px 10px 2px var(--main-color);
}

.items .checkBubble.checked{
    background-color: var(--accent-color);
    border-color: var(--accent-color);
}

</style>

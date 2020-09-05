<template lang="pug">
    .items
        ul(v-for="item in sortedItems" :key="item.id")
            .listRow
                popper(class="popperOuter" trigger="hover"
                        :delay-on-mouse-over="600"
                        :options="popperOptions").buttonBox
                    .popper {{$t('delete')}}
                    font-awesome-icon(icon="trash-alt" v-on:click="deleteItem(item.id)" 
                                        slot="reference").icon
                popper(class="popperOuter" trigger="hover"
                        :delay-on-mouse-over="600"
                        :options="popperOptions").buttonBox
                    .popper {{$t('edit')}}
                    font-awesome-icon(icon="pencil-alt" v-on:click="editTitle(item.id)"
                                        slot="reference").icon
                li(:class="item.state ? 'checked' : ''"
                    v-on:click="markDoneUndone(item.id)")
                    popper(v-if="editID !== item.id" class="popperOuter" trigger="hover" 
                            :delay-on-mouse-over="600"
                            :options="popperOptions")
                        .popper {{item.title}}
                        span.title(slot="reference")
                            | {{item.title}}
                            transition(name="lineThrough")
                                span.lineThrough(v-if="item.state")
                    input(v-else v-model="newTitle"
                            type="text"
                            @keypress.enter="updateTitle()"
                            @focusout="hideUpdateTitle()"
                            ref="inputField")
                .buttonBox
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
            editID: null,
            newTitle: null,
        };
    },

    methods: {
        markDoneUndone(id) {
            if (this.editID === null) {
                this.$emit('markDoneUndone', id);
            }
        },

        deleteItem(id) {
            this.$emit('deleteItem', id);
        },

        editTitle(id) {
            this.editID = id;
            const item = this.items.find((x) => x.id === id);
            this.newTitle = item.title;
            this.$nextTick(() => {
                this.$refs.inputField[0].focus();
            });
        },

        updateTitle() {
            this.$emit('updateTitle', {
                title: this.newTitle,
                id: this.editID,
            });
            this.editID = null;
            this.newTitle = null;
        },

        hideUpdateTitle() {
            this.editID = null;
            this.newTitle = null;
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

<style lang="scss">
.items {
    min-height: 123px;

    ul {
        padding-inline-start: 0px;

        .listRow {
            cursor: pointer;
            padding-bottom: 5px;
            display: flex;
            align-items: stretch;
            width: 100%;
            height: 31px;

            .popperOuter {
                .popper {
                    color: var(--main-color);
                    font-family: 'Montserrat', sans-serif;
                }
            }

            li {
                color: var(--main-color);
                list-style: none;
                display: flex;
                flex: 1 1 auto;
                font-size: 23px;
                transition: color 1s ease;
                min-width: 0;

                .popperOuter {
                    display: flex;
                    width: 100%;

                    .popper {
                        font-size: 23px;
                        font-weight: 200;
                    }

                    .title {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        position: relative;
                        transition: color 0.3s ease;

                        &:hover {
                            color: var(--sec-text-color);
                        }

                        .lineThrough {
                            background-color: var(--sec-text-color);
                            bottom: 0;
                            display: block;
                            height: 1px;
                            margin: auto 0;
                            position: absolute;
                            top: 0;
                            width: 100%;
                        }

                        .lineThrough-enter-active,
                        .lineThrough-leave-active {
                            transition: width 1s ease;
                        }

                        .lineThrough-enter,
                        .lineThrough-leave-to {
                            width: 0;
                        }
                    }
                }

                input {
                    width: 100%;
                    color: var(--main-color);
                    font-size: 23px;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 200;
                    border: 1px solid var(--main-color);
                    border-radius: 3px;
                }
            }

            .buttonBox {
                display: flex;
                flex: 0 0 15px;
                height: 100%;
                align-items: center;

                .bubble {
                    width: 15px;
                    height: 15px;
                    border: 1px solid var(--main-color);
                    border-radius: 100%;
                }

                .checked {
                    background-color: var(--accent-color);
                    border-color: var(--accent-color);
                }

                .checkBubble {
                    margin-left: 11px;
                    transition: all 0.75s ease;

                    &:hover {
                        box-shadow: 0px 0px 10px 2px var(--main-color);
                    }
                }
            }

            .checked {
                color: var(--sec-text-color);
            }

            .icon {
                transition: color 0.5s ease;

                &:hover {
                    color: var(--accent-color);
                }
            }
        }
    }
}
</style>

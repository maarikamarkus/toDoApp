<template lang="pug">
  #app(v-if="token")
    #innerApp
      Header
      Items(:items="items" 
        @markDoneUndone="markDoneUndone"
        @deleteItem="deleteItem")
      Footer(:items="items" @addItem="addItem")
  Login(v-else @login="login")
</template>

<script>
import axios from 'axios';
import Header from './components/Header.vue';
import Items from './components/Items.vue';
import Footer from './components/Footer.vue';
import Login from './components/Login.vue';

export default {
    name: 'App',
    components: {
        Header,
        Items,
        Footer,
        Login,
    },

    data() {
        return {
            items: [],
            token: '',
            axiosConf: {},
        };
    },

    methods: {
        async login(token) {
            this.setToken(token);
            window.localStorage.setItem('token', token);
            this.getList();
        },

        async getList() {
            const res = await axios.get(
                `${process.env.VUE_APP_BACKEND_URL}/todo`,
                this.axiosConf,
            );
            this.items = res.data;
        },

        setToken(token) {
            this.token = token;
            this.axiosConf = { 
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            };
        },

        markDoneUndone(id) {
            const item = this.items.find((x) => x.id === id);
            item.state = !item.state;
            axios.put(
                `${process.env.VUE_APP_BACKEND_URL}/todo/${id}`,
                null,
                this.axiosConf,
            );
        },

        deleteItem(id) {
            axios.delete(
                `${process.env.VUE_APP_BACKEND_URL}/todo/${id}`,
                this.axiosConf,
            );
            const itemIndex = this.items.findIndex((x) => x.id === id);
            this.items.splice(itemIndex, 1);
        },

        async addItem(newItem) {
            const res = await axios.post(
                `${process.env.VUE_APP_BACKEND_URL}/todo`,
                newItem,
                this.axiosConf,
            );
            newItem.id = parseInt(res.data, 10); // eslint-disable-line no-param-reassign
            this.items.push(newItem);
        },
    },

    async created() {
        const token = localStorage.getItem('token');
        if (token !== null) {
            this.setToken(token);
            this.getList();
        }
    },
};
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
  width: 500px;
  left: 50%;
  margin-left: -250px;
  position: relative;
  color: #086972;
}

#innerApp {
  padding: 7px;
}

@media(max-width: 600px) {
  #app {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
</style>

<template lang="pug">
    .loginForm
        .username.formRow
            .icon
                font-awesome-icon(:icon="['far', 'user']")
            input(v-model="username" type="text" placeholder="Sisesta kasutajanimi" required)
        .password.formRow
            .icon
                font-awesome-icon(icon="lock")
            input(
                v-model="password" 
                type="password" 
                placeholder="Sisesta parool" 
                required
                @keypress.enter="login()")
        transition(name="warning")
            .warning(v-if="error !== ''")
                .icon {{emoji}}
                | {{error}}
        .loginOuter
            .login(v-on:click="login()") 
                .icon
                    font-awesome-icon(icon="sign-in-alt")                                    
                | Logi sisse
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: '',
            emoji: '😭',
        };
    },

    methods: {
        async login() {
            if (this.username === '' || this.password === '') {
                this.error = 'tühjad väljad';
                return;
            }
            const user = { username: this.username, password: this.password };
            const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/login`, user);
            if (Object.prototype.hasOwnProperty.call(res.data, 'token')) {
                this.$emit('login', res.data.token);
            } else {
                this.error = 'sisselogimine ebaõnnestus!';
            }
        },
    },
};
</script>
<style>
.loginForm, .loginForm input {
    font-family: 'Montserrat', sans-serif;
}

.loginForm {
    width: 300px;
    left: 50%;
    margin-left: -150px;
    margin-top: 100px;
    position: relative;
    color: #086972;
}

.formRow .icon {
    display: flex;
    align-items: center;
    padding: 0 13px 0 13px;
    height: 100%;
    text-align: center;
}

.formRow {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 15px;
    border: 1px solid #086972;
    border-radius: 3px;
    transition: border 0.5s ease;
}

.loginForm input {
    padding: 0 0 0 5px;
    flex: 1 1 auto;
    font-size: 20px;
    color: rgb(150, 150, 150);
    height: 100%;
    border: none;
}

.loginForm input:focus {
    outline: none;
}

::placeholder {
    color: rgb(150, 150, 150);
}

.loginOuter {
    text-align: center;
    margin: 7px;
}

.login {
    cursor: pointer;
    color: white;
    display: inline-block;
    padding: 11px 17px 11px 17px;
    border: 1px solid #086972;
    border-radius: 3px;
    background-color: #01a9b4;
    transition: all 0.5s ease;
}

.login:hover, .formRow:hover {
    border: 1px solid #87dfd6;
    border-radius: 3px;
}

.login:hover {
    background-color: #87dfd6;
    color: #086972;
}

.icon {
    display: inline-block;
    padding-right: 13px;
}

.warning {
    background-color: #fbfd8a;
    border: 1px solid #cdb30c;
    border-radius: 3px;
    padding: 13px;
    margin-bottom: 17px;
    height: 23px;
    overflow: hidden;
}

.warning-enter {
    height: 0;
}

.warning-enter-active {
    transition: height 1s ease;
}

@media(max-width: 600px) {
  .loginForm {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
</style>

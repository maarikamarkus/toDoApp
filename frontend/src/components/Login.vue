<template lang="pug">
    .loginForm
        Language.lang
        .username.formRow
            .icon
                font-awesome-icon(:icon="['far', 'user']")
            input(v-model="username" type="text" :placeholder="$t('enterUsername')" required)
        .password.formRow
            .icon
                font-awesome-icon(icon="lock")
            input(
                v-model="password" 
                type="password" 
                :placeholder="$t('enterPassword')" 
                required
                @keypress.enter="register ? null : login()")
        .confirmPassword.formRow(v-if="register")
            .icon
                font-awesome-icon(icon="lock")
            input(
                v-model="confirmPassword" 
                type="password" 
                :placeholder="$t('confirmPassword')" 
                required
                @keypress.enter="signUp()")
        transition(name="warning")
            .warning(v-if="error !== ''")
                .icon {{emoji}}
                | {{error}}
        .loginOuter
            .left.button(v-on:click="login()" v-if="!register") 
                .icon
                    font-awesome-icon(icon="sign-in-alt")                                    
                | {{$t('login')}}
            .left.button(v-on:click="goToLogin()" v-if="register") 
                .icon
                    font-awesome-icon(icon="arrow-left")                                    
                | {{$t('goBack')}}
            .right.button(v-on:click="signUp()")
                .icon
                    font-awesome-icon(icon="user-plus")
                | {{$t('register')}}
</template>
<script>
import axios from 'axios';
import Language from './Language.vue';

function hasProperty(object, field) {
    return Object.prototype.hasOwnProperty.call(object, field);
}

export default {
    components: {
        Language,
    },

    data() {
        return {
            username: '',
            password: '',
            confirmPassword: '',
            error: '',
            emoji: '😭',
            register: false,
        };
    },

    methods: {
        checkLogin(res) {
            if (hasProperty(res.data, 'token')) {
                this.$emit('login', res.data.token);
            } else if (hasProperty(res.data, 'error')) {
                this.error = res.data.error;
            } else {
                this.error = 'esines suurem viga, helista Maarikale';
            }
        },

        async login() {
            if (this.username === '' || this.password === '') {
                this.error = 'tühjad väljad';
                return;
            }
            const user = { username: this.username, password: this.password };
            const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/login`, user);
            this.checkLogin(res);
        },

        async signUp() {
            if (this.register) {
                if (this.username === '' || this.password === '' || this.confirmPassword === '') {
                    this.error = 'tühjad väljad';
                    return;
                }

                if (this.password !== this.confirmPassword) {
                    this.error = 'paroolid erinevad';
                    return;
                }

                const user = { username: this.username, password: this.password };
                const res = await axios.post(`${process.env.VUE_APP_BACKEND_URL}/register`, user);
                this.checkLogin(res);
            }

            this.register = true;
        },

        goToLogin() {
            this.register = false;
        },
    },
};
</script>
<style>
.loginForm, .loginForm input {
    font-family: 'Montserrat', sans-serif;
}

.loginForm {
    width: 350px;
    left: 50%;
    margin-left: -175px;
    margin-top: 100px;
    position: relative;
    color: var(--main-color);
}

.loginForm .lang {
    padding: 11px 0px 11px 0px;
    float: right;
    font-weight: 400;
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
    border: 1px solid var(--main-color);
    border-radius: 3px;
    transition: border 0.5s ease;
}

.loginForm input {
    padding: 0 0 0 5px;
    flex: 1 1 auto;
    font-size: 20px;
    color: var(--sec-text-color);
    height: 100%;
    border: none;
}

.loginForm input:focus {
    outline: none;
}

::placeholder {
    color: var(--sec-text-color);
}

.loginOuter {
    display: inline-block;
    text-align: center;
    margin-top: 7px;
    width: 100%;
}

.button {
    cursor: pointer;
    color: white;
    padding: 11px 17px 11px 17px;
    border: 1px solid var(--accent-color);
    border-radius: 3px;
    background-color: #01a9b4;
    transition: all 0.5s ease;
}

.left, .right {
    display: inline-block;
    width: 135px;
}

.left {
    margin-right: 7px;
}

.button:hover, .formRow:hover {
    border: 1px solid var(--accent-color);
    border-radius: 3px;
}

.button:hover {
    background-color: var(--accent-color);
    color: var(--main-color);
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

<template lang="pug">
    //-.perse
        p tere
        p  
            | jou ville
        h1(a="foo" b="bar").
            mis teed
    .loginForm
        .username
            input(type="text" placeholder="Sisesta kasutajanimi" required)
        .password
            input(type="password" placeholder="Sisesta parool" required)

        .loginOuter
            .login Logi sisse
</template>
<script>
export default {

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

.loginForm input {
    font-size: 20px;
    width: 100%;
    padding: 7px;
    margin-bottom: 7px;
    color: rgb(150, 150, 150);
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
    padding: 7px 15px 7px 15px;
    border: 1px solid #086972;
    border-radius: 3px;
    background-color: #01a9b4;
    transition: all 0.5s ease;
}

.login:hover, input:hover {
    /*box-shadow: 0px 0px 10px 2px #87dfd6;*/
    border: 1px solid #87dfd6;
    border-radius: 3px;
}

.login:hover {
    background-color: #87dfd6;
    color: #086972;
}

input {
    border: 1px solid #086972;
    border-radius: 3px;
    transition: all 0.5s ease;
}

@media(max-width: 600px) {
  .loginForm {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
</style>

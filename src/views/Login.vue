<template>
  <form class="card auth-card" @submit.prevent="loginSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.required"
        >Поле Email не дложно быть пустым</small>
        <small class="helper-text invalid"
          v-if="$v.email.$dirty && !$v.email.email"
        >Не корректный Email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.required"
        >Введите пароль</small>
        <small class="helper-text invalid"
          v-if="$v.password.$dirty && !$v.password.minLength"
        >Слишком коротный пароль. Минимальная длина {{$v.password.$params.minLength.min}} символов</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators';
import messages from '@/utils/message'

export default {
  name: 'login',
  data: ()=>({
    email: '',
    password: '',
  }),
  validations:{
    email: {email, required},
    password: {required, minLength:minLength(6)},
  },
  methods:{
    async loginSubmit(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      try{
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      }catch(e){}

    }
  },mounted(){  
    if(messages[this.$route.query.message]){
      this.$messagePlugin(messages[this.$route.query.message])
    }
    
  }
}


// "ProfileTitle":"Зарегистрироваться",
// "ProfileTitle":"Нет аккаунта?",
// "ProfileTitle":"Войти",
// "ProfileTitle":"символов",
// "ProfileTitle":"Слишком коротный пароль. Минимальная длина",
// "ProfileTitle":"Введите пароль",
// "ProfileTitle":"Пароль",
// "ProfileTitle":"Не корректный Email",
// "ProfileTitle":"Поле Email не дложно быть пустым",
// "ProfileTitle":"Домашняя бухгалтерия",
</script>

<style>

</style>


<script>
import { RouterLink, RouterView } from 'vue-router'
export default{
    data() {
        return{
            nombre:'',
            contrasena: ''
        }
    },
    methods:{
        pasar : function(){
            this.$router.push("/inventario")
        }
    }
}
</script>


<template>
    <v-form v-model="valid">

        <v-text-field v-model="name" label="Nombre"></v-text-field>

        <v-text-field v-model="contrasena" label="Contraseña"></v-text-field>

        <v-btn @click="pasar">
            Submit
        </v-btn>

    </v-form>
</template>
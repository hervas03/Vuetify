<script>
import { RouterLink, RouterView } from 'vue-router'
import InventarioView from './views/InventarioView.vue';
export default {
    data() {
        return {
            nombre: "",
            contrasena: "",
            usuarioLogeado: false,
            nombreVal: true,
            contrasenaVal: true,
            usuarioRegistrado: true,
            usuarioConCredenciales: {
                nombreUserCredencial: "Admin",
                contrasenaUserCredencial: "1234"
            },
            usuariosRegistrados: {}
        };
    },
    watch: {
        nombre: function () {
            if (this.nombre == "") {
                this.nombreVal = false;
            }
            else {
                this.nombreVal = true;
            }
        },
        contrasena: function () {
            if (this.contrasena == "") {
                this.contrasenaVal = false;
            }
            else {
                this.contrasenaVal = true;
            }
        }
    },
    methods: {
        Registro: function () {
            if (this.nombre == "") {
                if (this.nombreVal) {
                    // alert("El nombre es incorrecto");
                    this.nombreVal = false;
                }
                else {
                    // alert("El nombre es incorrecto");
                    this.nombreVal = false;
                }
            }
            else if (this.nombre != "" && this.nombreVal) {
                // alert("El campo nombre Correcto");
                this.nombreVal = true;
            }
            if (this.contrasena == "") {
                if (this.contrasenaVal) {
                    // alert("El contrasena es incorrecto");
                    this.contrasenaVal = false;
                }
                else {
                    // alert("El contrasena es incorrecto");
                    this.contrasenaVal = false;
                }
            }
            else if (this.contrasena != "" && this.contrasenaVal) {
                // alert("El campo contrasena Correcto");
                this.contrasenaVal = true;
            }
            if (this.nombreVal && this.contrasenaVal) {
                if (this.nombre == this.usuarioConCredenciales.nombreUserCredencial && this.contrasena == this.usuarioConCredenciales.contrasenaUserCredencial) {
                    this.usuariosRegistrados = {
                        nombre: this.nombre,
                        contrasena: this.contrasena
                    };
                    this.usuarioLogeado = true;
                    this.usuarioRegistrado = true;
                    this.$router.push({ name: "inventario", params: { NombreUser: this.nombre } });
                }
                else {
                    alert("El usuario no tiene acceso");
                    this.usuarioRegistrado = false;
                }
                //this.$router.push({ name: 'inventario' })
            }
        }
    }
}
</script>

<template >
    <div class="contenedor" id="app">
        <span class="background"></span>
        <v-app id="inspire">
            <template v-if="!usuarioLogeado"> 
                <v-form class="formulario">
                    <div class="tituloFormulario">Registro</div>
                    <v-subheader v-if="!nombreVal" class="errorMensaje text-red">Introduce un nombre
                        correcto</v-subheader>
                    <v-text-field type="text" class="inputs" v-model="nombre" label="Nombre"></v-text-field>
                    <v-subheader v-if="!contrasenaVal" class="errorMensaje text-red">Introduce una contrasena
                        correcto</v-subheader>
                    <v-text-field type="password" class="inputs" v-model="contrasena" label="Contraseña"></v-text-field>
                    <v-btn @click="Registro">Registrarse </v-btn>
                    <v-subheader v-if="!usuarioRegistrado" class="errorMensaje text-red ml-3">Este usuario no esta
                        registrado</v-subheader>
                </v-form>
            </template>
            <RouterView />
        </v-app>
    </div>

</template>


<style scoped>
.formulario {
    width: 100%;
    max-width: 600px;
    margin: 14% auto;
    flex-direction: column;
    justify-content: center center;
    align-items: center;
    background-color: white;
    width: 30%;
    padding: 2%;
    border-radius: 6px;
}

.errorMensaje {
    font-size: 14px;
}

.tituloFormulario {
    font-size: 25px;
    padding-left: 1%;
    padding-bottom: 3%;
}

.background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('assets/img/fondo.jpg') no-repeat center center;
    background-size: cover;
    transform: scale(1);
}
</style>
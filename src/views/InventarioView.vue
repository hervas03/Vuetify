

<template>
    <v-card color="grey-lighten-4" flat height="60px" rounded="0">
        <v-toolbar extended extension-height="100">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>{{ NombreUsuario }}</v-toolbar-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line
                hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="dark" class="mb-2 mt-3" @click="modalRegistroUsuarios = true">Añadir
                Usuarios</v-btn>
            <v-btn icon @click="modalInicioUsuarios = true">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
        </v-toolbar>
    </v-card>
    <v-container>
        <v-btn color="light-blue-lighten-1" class="mb-2" @click="modal = true">Crear</v-btn>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Id</th>
                    <th class="text-left">Nombre</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in datos">
                    <td class="text-left">{{ index }}</td>
                    <td class="text-left">{{ item.nombre }}</td>
                    <td class="text-left">{{ item.cantidad }}</td>
                    <td class="text-left">
                        <v-btn color="yellow-accent-4" class="botonesAcciones" @click='editar(index, item.nombre)'>
                            Editar </v-btn>
                        <v-btn color="deep-orange-darken-1" class="botonesAcciones" @click='eliminar(index)'>
                            Eliminar
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-dialog v-model="modal" class="modal">
            <v-card title="Alimentos">
                <v-form>
                    <v-text-field v-if="editarActivado" v-model='id' name="id" label="Id del alimento"
                        class="inputDatos" readonly />
                    <v-text-field v-model='nombre' name="nombre" label="Nombre del alimento" class="inputDatos" />
                    <v-subheader v-if="!Admin" class="errorMensaje text-red">No tienes permiso para configurar
                        productos</v-subheader>
                    <v-btn color="red-darken-4" class="cerrarDialog" @click="modal = false, Admin = true, editarActivado = false">Cerrar</v-btn>
                    <v-btn color="green-accent-4" class="cerrarDialog"
                        @click="insertar(this.id, this.nombre)">Guardar</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalRegistroUsuarios" class="modal">
            <v-card title="Registro de usuarios">
                <v-form>
                    <v-text-field type="text" v-model="nombreUsuario" name="nombreUsuario" label="Nombredelusuario"
                        class="inputDatos" />
                    <v-text-field type="text" v-model='contrasenaUsuario' name="contrasenaUsuario"
                        label="Contrasenadelusuario" class="inputDatos" />
                    <v-subheader v-if="!Admin" class="errorMensaje text-red">No tienes permisos para registrar
                        usuarios</v-subheader>
                    <v-btn color="red-darken-4" class="cerrarDialog"
                        @click="modalRegistroUsuarios = false, Admin = true">Cerrar</v-btn>
                    <v-btn color="green-accent-4" class="cerrarDialog" @click="insertarUsuarios()">Registrar</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalInicioUsuarios" class="modal">
            <v-card title="Iniciar Sesion">
                <v-form>
                    <v-text-field type="text" v-model="nombreInicioUsuario" name="nombreUsuario"
                        label="Nombredelusuario" class="inputDatos" />
                    <v-text-field type="text" v-model='contrasenaInicioUsuario' name="contrasenaUsuario"
                        label="Contrasenadelusuario" class="inputDatos" />
                    <v-btn color="red-darken-4" class="cerrarDialog"
                        @click="modalInicioUsuarios = false, Admin = true">Cerrar</v-btn>
                    <v-btn color="green-accent-4" class="cerrarDialog" @click="inicioSesion()">Iniciar sesion</v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            modal: false,
            modalRegistroUsuarios: false,
            modalInicioUsuarios: false,
            id: '',
            NombreUsuario: this.$route.params.NombreUser,
            nombre: '',
            cantidad: 1,
            datos: [],
            copiaDatos: [],
            editarActivado: false,
            usuariosNuevos: [{ nombre: 'Admin', contrasena: '1234' }],
            nombreUsuario: '',
            contrasenaUsuario: '',
            nombreInicioUsuario: '',
            contrasenaInicioUsuario: '',
            Admin: true,
            ProductoExistente: false,
            posicion: 0
        };
    },
    methods: {
        inicioSesion() {
            for (let i = 0; i < this.usuariosNuevos.length; i++) {
                if (this.nombreInicioUsuario === this.usuariosNuevos[i].nombre && this.contrasenaInicioUsuario === this.usuariosNuevos[i].contrasena) {
                    this.NombreUsuario = this.nombreInicioUsuario;
                    this.modalInicioUsuarios = false;
                    this.nombreInicioUsuario = '';
                    this.contrasenaInicioUsuario = '';
                    return;
                }
            }
            alert('Usuario o contraseña incorrectos');

        },
        insertar(id, nombre) {
            if (this.editarActivado) {
                if (this.NombreUsuario == 'Admin') {
                    this.copiaDatos = [...this.datos];
                    this.copiaDatos.splice(id, 1, { nombre: nombre, cantidad: this.cantidad });
                    this.datos = this.copiaDatos;
                    this.editarActivado = false;
                    this.modal = false;
                    this.id = '';
                    this.nombre = '';

                } else {
                    this.Admin = false;
                }

            } else {
                if (this.nombre == '') {
                    alert("la casilla de alimentos no puede estar vacia");
                } else {
                    if (this.NombreUsuario == 'Admin') {
                        const nuevoDato = { nombre: this.nombre, cantidad: this.cantidad };
                        let j = 0;
                        if (this.datos.length > 0) {
                            do {
                                if (this.nombre === this.datos[j].nombre) {
                                    this.ProductoExistente = true;
                                    this.datos[j].cantidad++;
                                } else {
                                    this.ProductoExistente = false;
                                }
                                j++;
                            } while (!this.ProductoExistente && j < this.datos.length);
                        }
                        if (this.ProductoExistente) {
                            this.id = '';
                            this.nombre = '';
                            this.modal = false;
                        } else {
                            this.datos.push(nuevoDato);
                            this.id = '';
                            this.nombre = '';
                            this.modal = false;
                        }

                        console.log(this.ProductoExistente);
                    } else {
                        this.Admin = false;
                    }
                }
            }
        },
        insertarUsuarios() {
            if (this.nombreUsuario == '' || this.contrasenaUsuario == '') {
                alert('Las casillas de usuario no puede estar vacias');
            } else {
                if (this.NombreUsuario == 'Admin') {
                    const nuevoUsuario = { nombre: this.nombreUsuario, contrasena: this.contrasenaUsuario };
                    //this.NombreUsuario =  this.nombreUsuario;
                    this.usuariosNuevos.push(nuevoUsuario);
                    this.nombreUsuario = '';
                    this.contrasenaUsuario = '';
                    this.modalRegistroUsuarios = false;
                    console.log(this.usuariosNuevos);
                } else {
                    this.Admin = false;
                }
            }
        },
        eliminar(id) {
            if (this.NombreUsuario == 'Admin') {
                this.copiaDatos = [...this.datos];
                // console.log(datos.value);
                this.copiaDatos.splice(id, 1);
                this.datos = this.copiaDatos;
            } else {
                alert('No tienes permisos para eliminar productos');
            }
        },
        editar(id, nombre) {
            this.modal = true;
            this.id = id;
            this.nombre = nombre;
            this.editarActivado = true
        }
    }
};
</script>

<style scoped>
.modal {
    width: 30%;
}

.inputDatos {
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 4%;
    margin-right: 4%;
}

.cerrarDialog {
    float: right;
    margin-bottom: 4%;
    margin-right: 4%;
}

.errorMensaje {
    font-size: 14px;
}


.botonesAcciones {
    padding-left: 5%;
    margin: 1%;
    padding-right: 5%;
}
</style>
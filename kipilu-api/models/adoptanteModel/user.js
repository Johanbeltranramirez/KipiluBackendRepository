const knex = require('../../config/db/db');
const AnimalAlter = require('../animalModel/AnimalAlter');

const Adoptante = {};

Adoptante.create = (adoptante, result) => {
    knex('Adoptantes')
        .insert({
            ID_Adoptante: adoptante.ID_Adoptante,
            P_Nombre: adoptante.P_Nombre,
            S_Nombre: adoptante.S_Nombre,
            P_Apellido: adoptante.P_Apellido,
            S_Apellido: adoptante.S_Apellido,
            Correo: adoptante.Correo,
            Direccion: adoptante.Direccion,
            Telefono: adoptante.Telefono,
            ID_Animal: adoptante.ID_Animal
        })
        .then(() => {
            console.log('Id del nuevo adoptante: ', adoptante.ID_Adoptante);
            // Llamar a la función para crear el formulario con el ID del adoptante
            createFormularioWithAdoptanteID(
                adoptante.ID_Adoptante,
                adoptante.ID_Animal,
                'NA', // Valor predeterminado para Validacion_donativo
                3,    // Valor predeterminado para Estado_solicitud
                'Form', // Valor predeterminado para Administrador
                result
            );
        })
        .catch((err) => {
            console.log('Error al crear el adoptante: ', err);
            result(err, null);
        });
};

// Función para crear el formulario con el ID del adoptante
const createFormularioWithAdoptanteID = (ID_Adoptante, ID_Animal, Validacion_donativo, Estado_solicitud, Administrador, result) => {
    const formulariosData = {
        ID_Adoptante: ID_Adoptante,
        ID_Animal: ID_Animal,
        Validacion_donativo: Validacion_donativo,
        Estado_solicitud: Estado_solicitud,
        Administrador: Administrador
    };

    knex('Formularios')
        .insert(formulariosData)
        .then((res) => {
            console.log('Id del nuevo formulario: ', res[0]);
            // Actualizar el estado del animal después de crear el formulario
            AnimalAlter.updateStateById(ID_Animal, result);
        })
        .catch((err) => {
            console.error('Error al crear el formulario: ', err);
            result(err, null);
        });
};

module.exports = Adoptante;

 const knex = require('../../config/db/db');

const formulariocreate = {};

Formularios.create = (formularios, result) => {
    knex('formularios')
        .insert({
            Adoptante: formularios.Adoptante,
            Animal: formularios.Animal,
            Validacion_donativo: formularios.Validacion_donativo,
            Estado_solicitud: formularios.Estado_solicitud,
            Administrador: formularios.Administrador
        })
        .then((res) => {
            console.log('Id del nuevo formulario: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.error('Error al crear el formulario: ', err);
            result(err, null);
        });
};

module.exports = Formularios;

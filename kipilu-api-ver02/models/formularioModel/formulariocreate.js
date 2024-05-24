const knex = require('../../config/db/db');

const formulariocreate = {};

formulariocreate.create = (formularios, result) => {
    knex('formularios')
        .insert({
            Adoptante: formularios.Adoptante,
            Animal: formularios.Animal,
            Validacion_donativo: 'N/A',
            Estado_solicitud: 3,
            Administrador: 'CC1027524883'
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

module.exports = formulariocreate;

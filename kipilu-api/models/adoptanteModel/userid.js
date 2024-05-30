const knex = require('../../config/db/db');

const userid = {};

userid.searchById = (busqueda, result) => {
    const queryParam = `%${busqueda}%`;

    knex('Adoptantes')
        .select('ID_Adoptante', 'P_Nombre', 'S_Nombre', 'P_Apellido', 'S_Apellido', 'Correo', 'Direccion', 'Telefono')
        .where('ID_Adoptante', 'like', queryParam)
        .then((res) => {
            console.log('Adoptantes encontrados: ', res);
            result(null, res);
        })
        .catch((err) => {
            console.log('Error al buscar adoptantes por ID: ', err);
            result(err, null);
        });
};

module.exports = userid;

const knex = require('../../config/db/db');

const Raza = {};

Raza.create = (raza, result) => {
    knex('Razas')
        .insert({ Nombre_Raza: raza.Nombre_Raza })
        .then((res) => {
            console.log('Id de la nueva raza: ', res[0]);
            result(null, res[0]);
        })
        .catch((err) => {
            console.log('Error al crear la raza: ', err);
            result(err, null);
        });
};

Raza.getAll = (result) => {
    knex.select('*').from('Razas')
        .then((res) => {
            const razas = res.map((raza) => {
                return {
                    ID_Raza: raza.ID_Raza,
                    Nombre_Raza: raza.Nombre_Raza
                };
            });
            result(null, razas);
        })
        .catch((err) => {
            console.log('Error al obtener las razas: ', err);
            result(err, null);
        });
};

Raza.delete = (id, result) => {
    knex('Razas')
        .where('ID_Raza', id)
        .del()
        .then((res) => {
            if (res) {
                console.log(`Raza con ID ${id} eliminada.`);
                result(null, res);
            } else {
                console.log(`No se encontró la raza con ID ${id}.`);
                result({ kind: "not_found" }, null);
            }
        })
        .catch((err) => {
            console.log('Error al eliminar la raza: ', err);
            result(err, null);
        });
};

module.exports = Raza;

exports.up = function(knex) {
    return knex.schema.createTable('Sexos', function(table) {
      table.integer('ID_Sexo').unsigned().notNullable().primary();
      table.string('Nombre_Sexo', 10).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Sexos').insert([
        { ID_Sexo: 1, Nombre_Sexo: 'Hembra' },
        { ID_Sexo: 2, Nombre_Sexo: 'Macho' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Sexos');
  };  

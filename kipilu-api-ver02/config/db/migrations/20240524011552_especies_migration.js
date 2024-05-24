exports.up = function(knex) {
    return knex.schema.createTable('Especies', function(table) {
      table.integer('ID_Especie').unsigned().notNullable().primary();
      table.string('Especie_Animal', 10).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Especies').insert([
        { ID_Especie: 1, Especie_Animal: 'Canino' },
        { ID_Especie: 2, Especie_Animal: 'Felino' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Especies');
  };
  

exports.up = function(knex) {
    return knex.schema.createTable('Razas', function(table) {
      table.increments('ID_Raza').primary();
      table.string('Nombre_Raza', 20).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Razas').insert([
        { Nombre_Raza: 'Pitbull' },
        { Nombre_Raza: 'Bulldog' },
        { Nombre_Raza: 'Siamés' },
        { Nombre_Raza: 'Carey' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Razas');
  };
  

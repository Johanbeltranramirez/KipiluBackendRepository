exports.up = function(knex) {
    return knex.schema.createTable('Estados_Animales', function(table) {
      table.integer('ID_Estado').unsigned().notNullable().primary();
      table.string('Nombre_Proceso', 25).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Estados_Animales').insert([
        { ID_Estado: 1, Nombre_Proceso: 'Adoptado' },
        { ID_Estado: 2, Nombre_Proceso: 'No Adoptado' },
        { ID_Estado: 3, Nombre_Proceso: 'En Proceso de Adopción' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Estados_Animales');
  };

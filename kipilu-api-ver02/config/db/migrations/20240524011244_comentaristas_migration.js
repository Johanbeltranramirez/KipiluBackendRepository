exports.up = function(knex) {
    return knex.schema.createTable('Comentaristas', function(table) {
      table.increments('ID_Comentario').primary();
      table.string('Nombre', 25).notNullable();
      table.string('Apellido', 25).notNullable();
      table.string('Comentario', 150).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Comentaristas');
  };  

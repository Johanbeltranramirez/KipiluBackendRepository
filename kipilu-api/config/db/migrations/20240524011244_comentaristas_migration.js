exports.up = function(knex) {
    return knex.schema.createTable('Comentaristas', function(table) {
      table.increments('ID_Comentario').primary();
      table.string('Nombre', 25).notNullable();
      table.string('Apellido', 25).notNullable();
      table.string('Comentario', 70).notNullable();
    })
    .then(function() {
      // Insertar datos
      return knex('Comentaristas').insert([
        { Nombre: 'Juan', Apellido: 'Perez', Comentario: 'QUÉ BEIOSSSS AHHHHH <33' },
        { Nombre: 'María', Apellido: 'García Lorca', Comentario: 'Interesante, gracias por compartir tan nindos perritos' }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Comentaristas');
  };  

exports.up = function(knex) {
    return knex.schema.createTable('Animales', function(table) {
      table.increments('ID_Animal').primary();
      table.string('Nombre_Animal', 20).notNullable();
      table.integer('Razas').unsigned().notNullable();
      table.integer('Sexo').unsigned().notNullable();
      table.string('Foto', 400).notNullable();
      table.string('Descripcion', 300).notNullable();
      table.integer('Especie_Animal').unsigned().notNullable();
      table.integer('Estado_Animal').unsigned().notNullable();
  
      table.foreign('Sexo').references('ID_Sexo').inTable('Sexos');
      table.foreign('Especie_Animal').references('ID_Especie').inTable('Especies');
      table.foreign('Razas').references('ID_Raza').inTable('Razas');
      table.foreign('Estado_Animal').references('ID_Estado').inTable('Estados_Animales');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Animales');
  };
  
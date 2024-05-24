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
    })
    .then(function() {
      // Insertar datos
      return knex('Animales').insert([
        { 
          Nombre_Animal: 'Kaiser',
          Razas: 1, 
          Sexo: 2, 
          Foto: 'https://firebasestorage.googleapis.com/v0/b/repositorio-apps-moviles-33aa7.appspot.com/o/CM-Kaiser_2.jpg?alt=media&token=2e616aa3-c720-42f5-9ddd-7773c8b27846',
          Descripcion: 'Es un perro amigable y juguetón.',
          Especie_Animal: 1,
          Estado_Animal: 2 
        },
        { 
          Nombre_Animal: 'Luna',
          Razas: 2,
          Sexo: 1, 
          Foto: 'https://firebasestorage.googleapis.com/v0/b/repositorio-apps-moviles-33aa7.appspot.com/o/CH-Luna_6.jpg?alt=media&token=f018ec4f-177c-4b93-997b-27475e28d29f',
          Descripcion: 'Luna es una perrita tranquila y cariñosa.',
          Especie_Animal: 1, 
          Estado_Animal: 3
        },
        { 
          Nombre_Animal: 'Yuki',
          Razas: 3, 
          Sexo: 2, 
          Foto: 'https://firebasestorage.googleapis.com/v0/b/repositorio-apps-moviles-33aa7.appspot.com/o/FM-Yuky_1.jpg?alt=media&token=7ac1a765-4c8f-41b0-85dd-8706d6b9aadf',
          Descripcion: 'Yuki es una gato muy apegado a las personas.',
          Especie_Animal: 2, 
          Estado_Animal: 3 
        },
        { 
          Nombre_Animal: 'Misha',
          Razas: 4, 
          Sexo: 1, 
          Foto: 'https://firebasestorage.googleapis.com/v0/b/repositorio-apps-moviles-33aa7.appspot.com/o/FH-Misha_3.jpg?alt=media&token=6a36be93-fe6f-4da4-84d2-3ac5af93749b',
          Descripcion: 'Es una gatita muy leal y obediente.',
          Especie_Animal: 2, 
          Estado_Animal: 2 
        }
      ]);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('Animales');
  };
  

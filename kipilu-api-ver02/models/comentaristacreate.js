const db = require('../config/config');

const comentaristaPost = {};

comentaristaPost.create = (comentarista, result) => {
  const sql = `
    INSERT INTO Comentaristas (
      Nombre,
      Apellido,
      Comentario
    ) VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [
      comentarista.Nombre,
      comentarista.Apellido,
      comentarista.Comentario,
    ],
    (err, res) => {
      if (err) {
        console.log('Error al crear el comentarista: ', err);
        result(err, null);
      } else {
        console.log('Id del nuevo comentario: ', res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

module.exports = comentaristaPost;
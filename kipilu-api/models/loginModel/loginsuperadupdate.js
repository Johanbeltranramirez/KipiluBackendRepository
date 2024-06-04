const knex = require('../../config/db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const updatePassword = async (ID_Superadmin, newPassword) => {
    try {
        // Encriptar la nueva contraseña antes de actualizarla en la base de datos
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updatedRows = await knex('Super_admins')
            .where({ ID_Superadmin })
            .update({ Contrasena: hashedPassword });

        if (updatedRows) {
            console.log('Password updated successfully');
            return true;
        } else {
            console.log('No matching super admin found');
            return false;
        }
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

module.exports = {
    updatePassword
};

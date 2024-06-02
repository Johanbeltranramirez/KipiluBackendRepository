const knex = require('../../config/db/db');

const updatePassword = async (ID_Superadmin, newPassword) => {
    try {
        const updatedRows = await knex('Super_admins')
            .where({ ID_Superadmin })
            .update({ Contrasena: newPassword });

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

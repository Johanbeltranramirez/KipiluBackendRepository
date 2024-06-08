# KipiluBackendRepository


**Comando para realizar las migraciones (crear manualmente la BD kipiludb):**

npx knex migrate:latest --knexfile ./config/knexfile.js

**PAQUETES QUE SE NECESITAN INSTALAR**

1- npm install express

2- npm install knex

3- npm install tedious --save


# EJECUTAR PRUEBAS UNITARIAS
 
 **(Antes de iniciar colocar el comando npm run-script)**

 npm test test_uni **(Ejecutar todas las pruebas unitarias)**

 npm test administradorController.test.js
 
 npm test animalController.test.js
 
 npm test comentaristaController.test.js
 
 npm test formularioController.test.js
 
 npm test loginController.test.js 
 
 npm test razaController.test.js
 
npm test adoptanteController.test.js

# EJECUTAR PRUEBAS INTEGRALES

npm test test_int **(Ejecutar todas las pruebas integrales)**

npm test test_int/adoptante.test.js

npm test test_int/administrador.test.js

//Creamos un script para que nuestros environments se actualicen de manera automatica

// 1. Leemos del file system(fs). Cogemos el mkdirSync(crea un directorio) y el writeFileSync(crea el archivo)
const { writeFileSync, mkdirSync } = require('fs');

// 2. Necesitamos leer las variables de entorno. PAra ello, necesitamos el paquete dotenv
// Instalacion del paquete dotenv con: npm i -D dotevn
// La usamos con la configuracion por defecto, que establecen las variables de entorno que van a estar
// en el archivo .env
require( 'dotenv' ).config();

// 3. Creamos las constantes, que crean un directorio que se encontraran dentro de los paths indicados.
// El primero se usara en modo produccion, el segundo en modo desarrollo
const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapboxKey = process.env['MAPBOX_KEY'];

// 4. Hacemos la consulta de si existe la variable de entorno. En caso de no tenerlo, da un error
if ( !mapboxKey ) {
    throw new Error('MAPBOX_KEY is not set');    
};

// 5. Creamos una constante que tendra el contenido del archivo que vamos a crear. Esta informacion
// la cogemos directamente de lo que tenemos escrito en el archivo de environment.ts o la creamos aqui directamente. 
// Si tuviesemos mas variables de entorno, las creariamos en esta seccion dentro del const environment
const envFileContent = `
    export const environment = {
        mapboxKey: "${ mapboxKey }"
    };
`;

// 5. Cogemos el mkdirSync que creamos en el primer paso, donde indicamos el path y nos aseguramos de que se 
// crea en caso de no existir (recursive). En caso de que no exista, lo creara por nosotros
mkdirSync('./src/environments', { recursive: true } );

// 6. Cogemos el writeFileSync del primer paso, para escribir un archivo. El archivo sera la constante creada en el 
//tercer paso (targetPath), y su contenido sera el envFileContent creado en el quinto paso.
// Creamos el archivo para el environment.ts y para el environment.development.ts
writeFileSync( targetPath, envFileContent );
writeFileSync( targetPathDev, envFileContent );

// En resumen:
// 1. Leemos las variables de entorno
// 2. Definimos los paths
// 3. Leemos la variable de entorno del process.env
// 4. Si no existe, lanzamos un error
// 5. Indicamos el contenido del archivo
// 6. Creamos los dos paths con el mkdirSync y el writeFileSync

// Si no tuviesemos la carpeta o los archivos de environments, los podemos crear con esta informacion en la terminal. 
// Para eso ponemos 'node ./scripts/set-envs.js', y esto deberia crearnos directamente la carpeta y los dos
// archivos de environment.ts y environment.development.ts

// Ya que esto no es algo comun o estandar de angular, debemos indicar el script en los package.json.
// En la parte de scripts anadimos lo siguiente:     "set-envs": "node ./scripts/set-envs.js".
// De esta manera, si queremos volver a crear la carpeta de environments, podemos escribir en la 
// terminal npm run set-envs y nos crea todo de nuevo al momento.
// Ademas, tenemos que indicar en el README que tienen que ejecutar el comando de npm para que cree 
// los archivos de environments

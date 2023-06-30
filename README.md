# grupo-Naco-backend

1. Para instalar las dependencias se debe correr yarn install en la terminal. Para correr el juego se debe correr yarn dev.

2. Para levantar la base de datos, primero se debe crear un archivo .env con la siguiente informacion:
- DB_USERNAME = tu username
- DB_PASSWORD = tu password
- DB_NAME = naco
- DB_HOST = 'localhost'

Luego, se debe crear una base de datos en la terminal corriendo yarn sequelize-cli dbcreate naco_development. Luego se deben correr las migraciones con yarn sequelize-cli db:migrate. Por ultimo, se deben correr las seeds con yarn sequelize-cli db:seed:all. 

3. Flujo del juego:

- Primero se llama un metodo post desde el frontend con la ruta `http://localhost:3000/board/`, con el parametro {user_id}. Este router espera a que se hayan conectado los tres jugadores. Si todavia no son 3, la respuesta va a ser 'Esperando a que otros jugadores inicien el juego'. Cuando ya se conectaron los 3, se reparten territorios, escudo y objetivo a cada uno de los jugadores en la base de datos. Tambien define el turno. La respuesta va a ser 'El juego ha comenzado'. 

- Cuando el frontend recibe 'Esperando a que otros jugadores inicien el juego' (este seria el caso de los dos primeros jugadores que se metieron al juego), se va a estar llamando constantemente al router board.repartir con un metogo GET y ruta `http://localhost:3000/board/:id` hasta que la respuesta no sea 'No hay juego activo'. Caundo haya juego activo, se van a recibir todos los datos para iniciar el juego (que se repartieron cuando inició el juego) 
- Cuando el frontend recibe 'El juego ha comenzado', (este seria el caso del ultimo jugador que se metió al juego) se va a llamar al router board.repartir con el metodo GET y la ruta `http://localhost:3000/board/:id`. La respuesta van a ser todos los datos para iniciar el juego (que se repartieron cuando inicio el juego) .

- Cuando es el turno de un usuario, este va a poder seleccionar un territorio para atacar y se va a llamar a un metodo POST con la ruta `http://localhost:3000/attack/` y los parametros { attacker, territory_attacked }. En este router se va a verificar que el terreno atacado sea valido (que sea un vecino y que no sea un territorio del atacante). Si esto se cumple, se van a entregar numeros aleatorios para el atacante y el atacado. Si el numero del atacante es mayor, este gana el territorio. Luego de esto se va a verificar si se cumplió el objetivo del atacante. La respuesta que se entrega es {num1, num2, result_num, territory, result_goal}. 

- En el frontend de cada jugador se va a estar llamando constantemente al router update para ir actalizando todos los cambios que se vayan haciendo durante el juego. Se llama con un metodo GET con la ruta `http://localhost:3000/update/:id`. La respuesta va a ser 
{
    winner: game.winner,
    territories: territories,
    conquer_territories: count_territories, 
    turn: user_turn
}
Cuando hay un winner, se termina el juego.

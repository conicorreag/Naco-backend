const Router = require('koa-router');

const router = new Router();

function random_num() {
  const numero1 = Math.floor(Math.random() * 6) + 1;
  let numero2 = Math.floor(Math.random() * 6) + 1;
  while (numero2 === numero1) {
    numero2 = Math.floor(Math.random() * 6) + 1;
  }
  return [numero1, numero2];
}

router.post('attack', '/', async (ctx) => {
  try {
    // Recibo el id del atacante y del terriotorio que va a atacar.
    const { attacker, territory_attacked_id } = ctx.request.body;

    // Obtenemos los vecinos del terriorio que se esta atacando
    const territory_neighbors = await ctx.orm.Neighbor.findOne({
      where: { territoryId: territory_attacked_id },
    });

    // Obtenemos los territorios del atacante
    const territories_attacker = await ctx.orm.Territory.findAll({
      where: { userId: attacker },
    });

    // Verificamos si uno de los vecinos del terriorio que se esta atacando pertenece al atacante.
    // Si pertenece, se puede realizar el ataque.
    let puede = true;
    for (let i = 0; i < territories_attacker.length; i++) {
      if (territories_attacker[i].id == territory_attacked_id) {
        puede = false;
        ctx.body = { propio: true, vecino: null };
        ctx.status = 200;
      }
    }
    if (puede) {
      for (let i = 0; i < territories_attacker.length; i++) {
        if (territories_attacker[i].id == territory_neighbors.neighbor1
                    || territories_attacker[i].id == territory_neighbors.neighbor2
                    || territories_attacker[i].id == territory_neighbors.neighbor3
                    || territories_attacker[i].id == territory_neighbors.neighbor4) {
          console.log('aqui4');
          const nums = random_num();
          const num1 = nums[0];
          const num2 = nums[1];
          let result_num = false;
          const territory = territory_attacked_id;
          let result_goal = false;
          console.log(`num1: ${num1}`);
          console.log(`num2: ${num2}`);
          if (num1 > num2) {
            result_num = true;
            // Actualizar la base de datos
            const shield = await ctx.orm.Shield.findOne(
              { where: { userId: attacker } },
            );
            const shield_id = shield.id;
            await ctx.orm.Territory.update(
              { userId: attacker, shieldId: shield_id },
              { where: { id: territory_attacked_id } },
            );

            // Verificar si gano
            const goal = await ctx.orm.Goal.findOne({
              where: { userId: attacker },
            });
            let num_territories = 0;
            // Recorremos todos los territorios del usuario y sumamos cuantos son del
            // reino que tiene que conquistar
            const territories_attacker2 = await ctx.orm.Territory.findAll({
              where: { userId: attacker },
            });
            for (let j = 0; j < territories_attacker2.length; j++) {
              if (territories_attacker2[j].kingdomId == goal.kingdomId) {
                num_territories++;
              }
            }
            // Si ganó:
            if (num_territories == 6) {
              result_goal = true;
              await ctx.orm.Game.update(
                { playing: false, winner: attacker },
                { where: { playing: true } },
              );
              await ctx.orm.Goal.update(
                { userId: null },
                { where: {} }, // Sin condiciones, se actualizarán todas las filas
              );
              await ctx.orm.User.update(
                { playing: false },
                { where: { playing: true } },
              );
            }
          }
          // Actualizar el turno
          const game1 = await ctx.orm.Game.findOne({
            where: { playing: true },
          });

          // Si no se ha terminado el juego
          if (game1 != null) {
            let current_turn2 = game1.current_turn;
            if (current_turn2 == 3) {
              current_turn2 = 1;
            } else {
              current_turn2++;
            }
            await ctx.orm.Game.update(
              { current_turn: current_turn2 },
              { where: { playing: true } },
            );
          }

          // Buscamos el nombre del kingdom que se está atacando
          const territory_attacked = await ctx.orm.Territory.findOne({
            where: { id: territory_attacked_id },
          });
          const kingdom_attacked = await ctx.orm.Kingdom.findOne({
            where: { id: territory_attacked.kingdomId },
          });
          const kingdom_attacked_name = kingdom_attacked.name;

          // Buscamos el nombre del atacado
          const user_attacked = await ctx.orm.User.findOne({
            where: { id: territory_attacked.userId },
          });

          ctx.body = {
            num1,
            num2,
            result_num,
            kingdom_attacked_name,
            result_goal,
            vecino: null,
            propio: null,
          };
          ctx.status = 200;
          return;
        }

        ctx.body = { vecino: false, propio: null };
        ctx.status = 200;
      }
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
    console.log('-----------------------------');
    console.log('ERROR: ', error);
  }
});

module.exports = router;

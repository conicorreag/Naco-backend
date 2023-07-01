const Router = require('koa-router');

const router = new Router();

// false si todavia no parte el juego, true si estamos jugando
let gameStatus = false;
let playerCount = 0;
// let isProcessing = false;

router.post('board.start', '/', async (ctx) => {
  try {
    // Verificar si ya se está procesando una solicitud
    // if (isProcessing) {
    //     ctx.body = { message: 'El juego ya está en proceso de inicio' };
    //     ctx.status = 200;
    //     return;
    // }

    // // Establecer la variable de bloqueo
    // isProcessing = true;

    const { user_id } = ctx.request.body;

    const game = await ctx.orm.Game.findOne({ where: { playing: true } });

    if (game === null) {
      const user1 = await ctx.orm.User.findOne({ where: { id: user_id } });
      if (user1.playing == false) {
        playerCount++;
        await ctx.orm.User.update(
          { playing: true },
          { where: { id: user_id } },
        );
      }
      console.log("--------PLAYING--------", playerCount)
      

    }

    if (playerCount === 3) {
      gameStatus = true;
      const users = await ctx.orm.User.findAll({
        where: { playing: true },
      });
      console.log('-------USERS------:', users);

      // Crear juego
      const game1 = await ctx.orm.Game.create({
        playing: true, current_turn: 1, createdAt: new Date(), updatedAt: new Date(),
      });

      // Objetivo
      const numbers_goal = [1, 2, 3, 4, 5];
      const shuffledNumbers_goal = numbers_goal.sort(() => 0.5 - Math.random());
      const randomNumbers_goal = shuffledNumbers_goal.slice(0, 3); // Obtener 3 números aleatorios
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const randomNumber_goal = randomNumbers_goal[i];

        await ctx.orm.Goal.update(
          { userId: user.id },
          { where: { id: randomNumber_goal } },
        );
      }

      // Escudos
      const numbers_shield = [1, 2, 3];
      const shuffledNumbers_shield = numbers_shield.sort(() => 0.5 - Math.random());
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const randomNumber_shield = shuffledNumbers_shield[i];

        await ctx.orm.Shield.update(
          { userId: user.id },
          { where: { id: randomNumber_shield } },
        );
      }

      // Terrenos
      const numbers_territory = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
      const shuffledNumbers_territory = numbers_territory.sort(() => 0.5 - Math.random());
      const user1 = users[0];
      const shield1 = await ctx.orm.Shield.findOne({ where: { userId: user1.id } });
      for (let i = 0; i < 10; i++) {
        await ctx.orm.Territory.update(
          { userId: user1.id, shieldId: shield1.id },
          { where: { id: shuffledNumbers_territory[i] } },
        );
      }
      const user2 = users[1];
      const shield2 = await ctx.orm.Shield.findOne({ where: { userId: user2.id } });
      for (let i = 10; i < 20; i++) {
        await ctx.orm.Territory.update(
          { userId: user2.id, shieldId: shield2.id },
          { where: { id: shuffledNumbers_territory[i] } },
        );
      }
      const user3 = users[2];
      const shield3 = await ctx.orm.Shield.findOne({ where: { userId: user3.id } });
      for (let i = 20; i < 30; i++) {
        await ctx.orm.Territory.update(
          { userId: user3.id, shieldId: shield3.id },
          { where: { id: shuffledNumbers_territory[i] } },
        );
      }

      // Turno
      const numbers_turn = [0, 1, 2];
      const shuffledNumbers_turn = numbers_turn.sort(() => 0.5 - Math.random());
      const user_turn1 = shuffledNumbers_turn[0];
      const user_turn2 = shuffledNumbers_turn[1];
      const user_turn3 = shuffledNumbers_turn[2];
      await ctx.orm.Game.update(
        { turn1: users[user_turn1].id, turn2: users[user_turn2].id, turn3: users[user_turn3].id },
        { where: { playing: true } },
      );

      playerCount = 0;

      ctx.body = { playing: true };
      ctx.status = 200;
    } else {
      ctx.body = { playing: false };
      ctx.status = 200;
      // isProcessing = false;
    }
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
    console.log('ERROR------:', error.message);
    // isProcessing = false;
  }
});

module.exports = router;

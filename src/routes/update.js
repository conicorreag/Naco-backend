const Router = require('koa-router');

const router = new Router();

router.get('/:id', async (ctx) => {
  try {
    const id = parseInt(ctx.params.id);
    const territories = await ctx.orm.Territory.findAll({
      order: [['id', 'ASC']],
    });
    // const game = await ctx.orm.Game.findOne({where:{playing: true}});
    const game = await ctx.orm.Game.findOne({
      order: [['id', 'DESC']],
      limit: 1,
    });
    console.log('GAME: ', game.playing);
    // console.log("aqui1");
    const goal = await ctx.orm.Goal.findOne({ where: { userId: id } });
    let user_turn = null;
    if (game.current_turn == 1) {
      user_turn = game.turn1;
    } else if (game.current_turn == 2) {
      user_turn = game.turn2;
    } else if (game.current_turn == 3) {
      user_turn = game.turn3;
    }

    let num_territories_missing = null;
    if (goal != null) {
      num_territories_missing = 0;
      for (let i = 0; i < territories.length; i++) {
        if (territories[i].userId == id && goal.kingdomId == territories[i].kingdomId) {
          num_territories_missing += 1;
        }
      }
    }
    num_territories_missing = 6 - num_territories_missing;

    let num_territories = 0;
    for (let j = 0; j < territories.length; j++) {
      if (territories[j].userId == id) {
        num_territories++;
      }
    }

    const username_turn = await ctx.orm.User.findOne({ where: { id: user_turn } });
    const username1 = username_turn.username;

    const { winner } = game;
    let winner_username = null;
    if (winner != null) {
      winner_username = await ctx.orm.User.findOne({ where: { id: winner } });
      winner_username = winner_username.username;
    }

    const response = {
      playing: game.playing,
      // si es false, se acabo el juego. Si playin false y winner null,
      // se acabo porque alguien se fue
      winner: winner_username,
      // si hay ganador, se acabo el juego
      territories,
      num_territories,
      num_territories_missing,
      // si conquer territories es null, se mantiene el ultimo valor
      // (en el frontend) (significa que ya se acabo el juego)
      turn: username1,
    };

    ctx.body = response;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error: error.message };
    ctx.status = 500;
    console.log('Error', error);
  }
});

module.exports = router;

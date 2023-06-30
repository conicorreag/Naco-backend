const Router = require('koa-router');

const router = new Router();

router.get('repartir', '/:id', async (ctx) => {
  const id = parseInt(ctx.params.id);

  const game = await ctx.orm.Game.findOne({ where: { playing: true } });
  if (game != null) {
    const goal = await ctx.orm.Goal.findOne({ where: { userId: id } });
    const shield = await ctx.orm.Shield.findOne({ where: { userId: id } });
    // const territories = await ctx.orm.Territory.findAll();
    const territories = await ctx.orm.Territory.findAll({
      order: [['id', 'ASC']],
    });

    let num_territories = 0;
    for (let j = 0; j < territories.length; j++) {
      if (territories[j].userId == id) {
        num_territories++;
      }
    }

    let num_territories_missing = 0;
    for (let j = 0; j < territories.length; j++) {
      if (territories[j].userId == id && territories[j].kingdomId == goal.kingdomId) {
        num_territories_missing++;
      }
    }
    num_territories_missing = 6 - num_territories_missing;

    const turn = game.current_turn;
    let user_turn = null;
    if (turn == 1) {
      user_turn = game.turn1;
    } else if (turn == 2) {
      user_turn = game.turn2;
    } else if (turn == 3) {
      user_turn = game.turn3;
    }
    console.log('user_turn', user_turn);
    const username_turn = await ctx.orm.User.findOne({ where: { id: user_turn } });
    console.log('username_turn', username_turn);
    const username1 = username_turn.username;

    const kingdom = await ctx.orm.Kingdom.findOne({ where: { id: goal.kingdomId } });

    const response = {
      playing: true,
      goal: kingdom.name,
      territories,
      num_territories,
      num_territories_missing,
      shield,
      turn: username1,
    };

    ctx.body = response;
    ctx.status = 200;
  } else {
    ctx.body = { playing: false };
    ctx.status = 200;
  }
});

module.exports = router;

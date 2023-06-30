const Router = require('koa-router');

const router = new Router();

router.post('/', async (ctx) => {
  try {
    const { user_id } = ctx.request.body;
    await ctx.orm.Game.update(
      { playing: false },
      { where: { playing: true } },
    );
    await ctx.orm.Goal.update(
      { userId: null },
      { where: {} }, // Sin condiciones, se actualizarán todas las filas
    );
    await ctx.orm.User.update(
      { playing: false },
      { where: { } },
    );
    await ctx.orm.Shield.update(
      { userId: null },
      { where: {} },
    );
    ctx.body = { message: 'User logged out' };
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

module.exports = router;

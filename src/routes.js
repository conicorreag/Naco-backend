const Router = require('koa-router');
const dotenv = require('dotenv');
const jwtMiddleware = require('koa-jwt');
const users = require('./routes/users');
const board = require('./routes/board');
const attack = require('./routes/attack');
const update = require('./routes/update');
const authRoutes = require('./routes/authentication');
const repartir = require('./routes/repartir');
const scopeProtectedRoutes = require('./routes/scopeExample');
const logout = require('./routes/logout');

dotenv.config();
const router = new Router();

router.use('/board', board.routes());

router.use('/attack', attack.routes());

router.use('/update', update.routes());

router.use('/repartir', repartir.routes());

router.use('/logout', logout.routes());

router.use(authRoutes.routes());

// Desde esta línea, todas las rutas requieriran un JWT. Esto no aplica para
// las líneas anteriores
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));
router.use('/users', users.routes());
router.use('/scope-example', scopeProtectedRoutes.routes());

module.exports = router;

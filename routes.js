var express = require('express');
var router = express.Router();
var authMiddl = require('./middlewares/authentication.js');

// Esta rota não requer autenticação, por isso é colocada antes
router.use(require('./routes/authentication.js'));

// Ativica o middeware de atuenticação para todas as rotas após essa linha
router.use(authMiddl);

//Rotas relacionadas aos usuários
router.use(require('./routes/users.js'));

module.exports = router;
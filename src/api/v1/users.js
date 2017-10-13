import { Router } from 'express';

const router = Router();

import userService from '../../services/user-service';

function listAll(req, res) {
  userService.listAll().then((users) => {
    res.json(users);
  }).catch((error) => {
    res.status(400).send(err);
  });
}

router.route('/users')
  .get(listAll);

export default router;

import {
  validateGuest
} from '../models/guest.js';
import express from 'express';
const router = express.Router();

router.post('/', async (req, res) => {
  const Guest = res.locals.models.guest;
  const {
    error
  } = validateGuest(req.body);
  if (error) {
    console.log(error);
    return res.status(400).send(error);
  }

      console.log(error);

  let guest = new Guest(req.body);
  console.log(guest);
  await guest.save();

  res.send(guest);
});

export default router;
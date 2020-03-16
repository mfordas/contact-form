import Joi from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
import mongoose from 'mongoose';
Joi.date = JoiDate(Joi);

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    default: 'Name',
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    default: 'LastName',
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    unique: true,
    trim: true,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  }
});

function validateGuest(guest) {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(26)
      .trim()
      .required(),
    lastName: Joi.string()
      .min(3)
      .max(26)
      .trim()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .trim()
      .required(),
    eventDate: Joi.date()
      .format('YYYY-MM-DD')
      .utc()
      .trim()
      .required()
  });

  return schema.validate(guest);
}

const guest = guestSchema;

export {
  guest,
  validateGuest
}
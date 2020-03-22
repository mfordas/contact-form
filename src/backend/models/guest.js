import JoiBasic from "@hapi/joi";
import JoiDate from "@hapi/joi-date";
import mongoose from "mongoose";

const Joi = JoiBasic.extend(JoiDate);

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    default: "Name",
    required: true
  },
  lastName: {
    type: String,
    minlength: 3,
    maxlength: 255,
    trim: true,
    default: "LastName",
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
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
      .required()
      .messages({
        "string.empty": "Please type your name",
        "string.min": "Name should have at least 3 characters",
        "string.max": "Name should have maximum 26 characters"
      }),
    lastName: Joi.string()
      .min(3)
      .max(26)
      .trim()
      .required()
      .messages({
        "string.empty": "Please type your last name",
        "string.min": "Last name should have at least 3 characters",
        "string.max": "Last name should have maximum 26 characters"
      }),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .trim()
      .required()
      .messages({
        "string.empty": "Please type your e-mail",
        "string.min": "E-mail should have at least 3 characters",
        "string.max": "E-mail should have maximum 255 characters",
        "string.email": "E-mail should have following format: id@domain"
      }),
    eventDate: Joi.date()
      .utc()
      .required()
      .messages({
        "date.base": "Date should have following format: DD/MM/YYYY",
        "date.empty": "Please type event date"
      })
  }).options({
    abortEarly: false
  });

  return schema.validate(guest);
}

const guest = guestSchema;

export { guest, validateGuest };

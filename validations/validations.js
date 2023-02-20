import {body} from 'express-validator';


export const registerValidation = [
  body("email", "Email is incorrect").isEmail(),
  body("password","Password must be more than 5 symbols").isLength({ min: 5 }),
  body("fullName", "Full name must be more than 3 symbols").isLength({ min: 3 }),
  body("avatarUrl", "Incorrect url").optional().isURL(),
];

export const loginValidation = [
  body("email", "Email is incorrect").isEmail(),
  body("password","Password must be more than 5 symbols").isLength({ min: 5 })
];

export const postCreateValidation = [
  body("title", "Enter post's description please").isLength({ min: 3 }).isString(),
  body("text", "Enter post's text please").isLength({ min: 5 }).isString(),
  body("tags", "Incorrect tag's format").optional().isString(),
  body("image","Incorrect URL").optional().isString()
];

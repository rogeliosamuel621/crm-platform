import * as Joi from 'joi';

export default Joi.object({
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().required()
});

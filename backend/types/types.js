const zod = require("zod");

const createAdmin = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const createCard = zod.object({
  name: zod.string(),
  description: zod.string(),
  linkedin: zod.string(),
  twitter: zod.string(),
  interests: zod.string(),
});

module.exports = { createCard, createAdmin };

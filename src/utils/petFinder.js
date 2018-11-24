import pf from "petfinder-client";

export const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

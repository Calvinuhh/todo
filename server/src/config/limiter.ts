import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  message: "Has alcanzado el limite de peticiones... espera un momento...",
  validate: { xForwardedForHeader: false },
});

export default limiter;

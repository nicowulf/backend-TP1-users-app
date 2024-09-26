import { createHash } from "node:crypto";

const hashPassword  = (password) => {
  return createHash("sha256").update(password).digest("hex");
};

export { hashPassword }
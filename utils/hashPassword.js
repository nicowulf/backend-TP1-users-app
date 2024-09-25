import { createHash } from "node:crypto";

const hashPassword = createHash("sha256").update(password).digest("hex");

export { hashPassword }
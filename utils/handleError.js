import { readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const handleError = (error, path) => {
    
  console.log(path)
  const dbError = JSON.parse(readFileSync(path));

  const newError = {
    id: randomUUID(),
    type: error.message,
    date: new Date().toISOString(),
    };
  
  dbError.push(newError);
  writeFileSync(path, JSON.stringify(dbError));
  return newError;
}  

export { handleError };

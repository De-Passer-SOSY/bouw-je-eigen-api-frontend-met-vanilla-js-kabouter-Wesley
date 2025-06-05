const crypto = require("crypto");
const { promisify } = require("node:util");
const db = require("./services/db");

const ITERATIONS = 20_000;
const KEYLEN = 64;
const DIGEST = "sha512";

async function hashString(string, salt) {
  const pbkdf2 = promisify(crypto.pbkdf2);
  const derivedKey = await pbkdf2(string, salt, ITERATIONS, KEYLEN, DIGEST);
  const hash = derivedKey.toString(`hex`);
  return hash;
}

async function hashPassword(plainPassword) {
  const passwordSalt = crypto.randomBytes(16).toString("hex");
  const passwordHash = await hashString(plainPassword, passwordSalt);
  return { passwordHash, passwordSalt };
}
async function verifyPassword(
  plainPassword,
  storedPasswordHash,
  storedPasswordSalt
) {
  const newPasswordHash = await hashString(plainPassword, storedPasswordSalt);
  return newPasswordHash === storedPasswordHash;
}

async function findUserByName(username) {
  const user = await db("users").whereILike("name", username).first();
  return user || null;
}

async function addUser(username, password) {
  if (!username || !password) {
    throw new Error("All fields are required!");
  }
  const name = String(username);

  const usernameTaken = await db("users").whereILike("name", name).first();
  console.log(usernameTaken);
  console.log(await db("users").whereILike("name", name), "\n\n\n\n\n\n\n");
  if (usernameTaken) {
    throw new Error("Username is already taken!");
  }
  console.log("hi");
  const hash = await hashPassword(password);
  const passwordHash = hash.passwordHash;
  const passwordSalt = hash.passwordSalt;

  try {
    const [id] = await db("users").insert({
      name,
      passwordHash,
      passwordSalt,
    });
    return id;
  } catch (error) {
    console.error("Insert error:", error);
    throw new Error("Internal server error");
  }
}

module.exports = {
  hashString,
  hashPassword,
  verifyPassword,
  addUser,
  findUserByName,
};

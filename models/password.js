import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberOfRounds();
  return await bcryptjs.hash(addPepper(password), rounds);
}

function getNumberOfRounds() {
  let rounds = 1;

  if (process.env.NODE_ENV === "production") {
    rounds = 14;
  }

  return rounds;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(addPepper(providedPassword), storedPassword);
}

function addPepper(password) {
  return password + process.env.PASSWORD_PEPPER;
}

const password = {
  hash,
  compare,
};

export default password;

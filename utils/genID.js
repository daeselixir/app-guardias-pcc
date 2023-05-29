const generateID = () => {
  const random = Math.random(32).toString(3).substring(1);

  const fecha = Date.now().toString(32);

  return random + fecha;
};

module.exports = generateID;

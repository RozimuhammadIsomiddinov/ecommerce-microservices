require("dotenv").config();
const app = require("./app");

const PORT = process.env.GATEWAY_PORT;

app.listen(PORT, () => {
  console.log(`Gateway running on port ${PORT}`);
});

const logger = require("./Src/Config/applogger.config");
const { PORT, DEVELOPMENT_MODE } = require("./Src/Config/index");
const app = require("./app");

function startServer() {
  app.listen(PORT, () => {
    // console.log(DEVELOPMENT_MODE);
    if (DEVELOPMENT_MODE === "development") {
      logger.info(`Server Mode : ${DEVELOPMENT_MODE}`);
      logger.info(`Server is running on  : http://localhost:${PORT}`);
    } else {
      console.log(`MODE : ${DEVELOPMENT_MODE}`);
      console.log("server is running on:  http://localhost:" + PORT);
    }
  });
}

startServer();

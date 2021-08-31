import logger from "pino";
import dayjs from "dayjs";

// A logging service to use instead of console.log
const log = logger({
  prettyPrint: true,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

import moment from "moment-timezone";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import util from "util";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const customFormat = format.printf((info) => {
    let logMessage;
    let { timestamp, level, message, stack } = info;
    let args = info[Symbol.for("splat")] ?? [];
    // console.log(info)
    if (stack) {
        logMessage = `${message}\n${ stack}`;
    } else {
        message = typeof message === "object" ? util.inspect(message, { depth: null, colors: false }) : message;
        logMessage = [ message, ...args.map((arg) => {
            if (typeof arg === "object") {
                return util.inspect(arg, { depth: null, colors: false });
            }
            return arg;
        }) ].join(" ");
    }

    // using ANSI escape sequences
    let color;
    let reset = "\x1b[0m";
    switch (level) {
    case "silly":
        color = "\x1b[38;5;132m"; // Peach
        break;
    case "debug":
        color = "\x1b[38;5;39m"; // Blue
        break;
    case "info":
        color = "\x1b[38;5;35m"; // Green
        break;
    case "warn":
        color = "\x1b[38;5;220m"; // Yellow
        break;
    case "error":
        color = "\x1b[38;5;160m"; // Red
        break;
    default:
        color = "\x1b[0m"; // Reset color
        break;
    }

    return `${color}[${timestamp}] : \n${logMessage}${reset}`;
});

const timezone = () => {
    const currentDate = new Date();
    return moment.utc(currentDate).tz(process.env.TIME_ZONE);
};

export const sqlQueryLogger = createLogger({
    level:"silly",
    format: format.combine(
        format.timestamp({ format: timezone }),
        customFormat
        // format.prettyPrint()
        // format.error({ stack: true }),
    ),
    transports: [
        // new transports.DailyRotateFile({
        //     level:"silly",
        //     filename:path.join(__dirname, "..", "/logs", "sql-%DATE%.log"),
        //     datePattern: "YYYY-MM-DD",
        //     maxFiles:7
        // }),
        new transports.Console({
            format:format.combine(
                // format.colorize(),
                // format.simple(),
                format.align()
            ),
            level:"silly",
            eol: "\n\n"
        })
    ]
});

const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.timestamp({ format: timezone }),
        format.errors({ stack:true }),
        customFormat,
    ),
    transports: [
        // new transports.File({filename:path.join(__dirname,"..","/logs","error.log"),level:"error"}),
        // new transports.DailyRotateFile({
        //     level:"error",
        //     filename:path.join(__dirname, "..", "/logs", "errorlog-%DATE%.log"),
        //     datePattern: "YYYY-MM-DD",
        //     maxFiles:7
        // }),
        // new transports.DailyRotateFile({
        //     level:"debug",
        //     filename:path.join(__dirname, "..", "/logs", "logfile-%DATE%.log"),
        //     datePattern: "YYYY-MM-DD",
        //     maxFiles:7
        // }),
        new transports.Console({
            format:format.combine(
                // format.colorize(),
                // format.simple(),
                format.align()
            ),
            level:"debug",
            eol: "\n\n"
        })
    ]
});

export default logger;
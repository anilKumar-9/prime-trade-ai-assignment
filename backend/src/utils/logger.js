import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    // Console logs
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),

    // Error logs
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // All logs
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

export default logger;

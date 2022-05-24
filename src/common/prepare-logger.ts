import { randomUUID } from 'crypto';
import { LoggerModule } from 'nestjs-pino/LoggerModule';

export const prepareLogger = () =>
  LoggerModule.forRoot({
    pinoHttp: {
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty' }
          : undefined,
      genReqId: () => randomUUID(),
      level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
      /**
       * Redact out some sensitive data from the request.
       *
       * e.g. '"headers":{"x-api-key":"[Redacted]",...,"body":{"title":"New post","content":"New post's content","creditCard":"[Redacted]"}},...'
       */
      redact: [
        'req.headers.authorization',
        'req.headers["x-api-key"]',
        'req.body.creditCard',
      ],
      serializers: {
        req: (req) => {
          req.body = req.raw.body; // log request body in logs

          return req;
        },
      },
      formatters: {
        // Otherwise prints the number equivalent of level (e.g. 40 for 'warn'), doesn't apply when `pino-pretty` is used
        level: (label) => ({ level: label }),
      },
      base: undefined, // remove 'pid' and 'hostname' from the log
    },
  });

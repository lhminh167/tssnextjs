import winston from 'winston';
import Elasticsearch from 'winston-elasticsearch';

const esTransportOpts = {
    level: 'info'
};

export const logger = winston.createLogger({
    transports: [
        // new Elasticsearch(esTransportOpts),
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console(),

    ]
});

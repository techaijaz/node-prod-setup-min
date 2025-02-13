import { createLogger, format, transports } from 'winston'
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports'
import util from 'util'
//import 'winston-mongodb'
import config from '../config/config'
import { EApplicationEnvionment } from '../constent/application'
import path from 'path'
import * as sourceMapSupport from 'source-map-support'
import { blue, green, magenta, red, yellow } from 'colorette'
//import { MongoDBTransportInstance } from 'winston-mongodb'

//Linking trace support
sourceMapSupport.install()

const coloriseLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level)
        case 'INFO':
            return blue(level)
        case 'WARN':
            return yellow(level)
        default:
            return level
    }
}

const consoleFormate = format.printf((info) => {
    const { level, message, timestamp, meta } = info
    const customLevel = coloriseLevel(level.toUpperCase())
    const customTimestamp = green(timestamp as string)
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true
    })

    const customLog = `${customLevel} [${customTimestamp}] ${message} \n ${magenta('META')} ${customMeta}\n`
    return customLog
})

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvionment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleFormate)
            })
        ]
    }
    return []
}

const fileFormate = format.printf((info) => {
    const { level, message, timestamp, meta } = info
    const logMeta: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                stack: value.stack || null
            }
        } else {
            logMeta[key] = value
        }
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta
    }

    return JSON.stringify(logData, null, 4)
})

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileFormate)
        })
    ]
}

// const mongodbTransport = (): Array<MongoDBTransportInstance> => {
//     return [
//         new transports.MongoDB({
//             level: 'info',
//             db: config.DATABASE_URL as string,
//             metaKey: 'meta',
//             expireAfterSeconds: 60 * 60 * 24 * 30,
//             options: {
//                 useUnifiedTopology: true
//             },
//             collection: 'application-logs'
//         })
//     ]
// }

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [
        ...fileTransport(),
        //...mongodbTransport(),
        ...consoleTransport()
    ]
})

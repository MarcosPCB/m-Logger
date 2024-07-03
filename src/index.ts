import { InitLogger, log, logErr, logWrn } from './InitLogger';
import { ILogger } from './types';

//All log functions log the data to the log file and to the console

const logger: ILogger = {
  //Initializer
  init: InitLogger,

  //Info level logger
  info: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      log.info(message, params)
    } else {
      console.log(message)
      log.info(message)
    }
  },

  //Error level logger
  error: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      logErr.error(message, params)
    } else {
      console.log(message)
      logErr.error(message)
    }
  },

  //Warning level logger
  warn: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      logWrn.warn(message, params)
    } else {
      console.log(message)
      logWrn.warn(message)
    }
  },

  //Arrays for storing timers
  timersLabel: [],
  timers: [],

  //Initializes a timer with a label
  time: (label: string) => {
    if (logger.timersLabel.indexOf(label) == -1) {
      logger.timersLabel.push(label)
      logger.timers.push(new Date(Date.now()).getTime())
    } else {
      console.log(`Timer ${label} already running`)
      log.info(`Timer ${label} already running`)
    }
  },

  //Ends a timer and logs it
  timeEnd: (label: string) => {
    const i = logger.timersLabel.indexOf(label)
    if (i != -1) {
      let reqTime: number | string =
        (new Date(Date.now()).getTime() - logger.timers[i]) / 1000
      reqTime =
        reqTime > 60
          ? (reqTime / 60).toFixed(2) + ' m'
          : reqTime.toFixed(2) + ' s'
      logger.info(`${label}: ` + reqTime)
      logger.timers.splice(i, 1)
      logger.timersLabel.splice(i, 1)
    } else {
      console.log(`Timer ${label} not started`)
      log.info(`Timer ${label} not started`)
    }
  },
}

export default logger;

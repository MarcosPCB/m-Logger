import log4js from 'log4js'
import cron from 'node-cron'

var log = log4js.getLogger('log');
var logErr = log4js.getLogger('errLog');
var logWrn = log4js.getLogger('wrnLog');

interface ILogger {
  init(config: { 
    path: string, 
    level_error: boolean, 
    level_warning: boolean,
    daily: boolean,
  }): void,
  info(message: any, ...params: any[]): void,
  error(message: any, ...params: any[]): void,
  warn(message: any, ...params: any[]): void,
  time(label: string): void,
  timeEnd(label: string): void,
  log: log4js.Logger,
  logErr: log4js.Logger,
  logWrn: log4js.Logger,
  timersLabel: string[],
  timers: number[]
}

type TLConfig = { 
  path: string, 
  level_error: boolean, 
  level_warning: boolean,
  daily: boolean
}

function SetupLogs(path: string, levels: number, daily: boolean) {
  const logAppenders: any = {
    log: {
      type: 'file',
      filename: `${path}/info${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
    },
  }

  const logCategories: any = {
    default: { appenders: ['log'], level: 'all' }
  }

  if(levels & 1) {
    logAppenders.err = {
      type: 'file',
      filename: `${path}/error${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
    }

    logCategories.errLog = { appenders: ['err'], level: 'error' };
  }

  if(levels & 2) {
    logAppenders.wrn = {
      type: 'file',
      filename: `${path}/warning${daily ? '_' + new Date().toISOString().slice(0, 10) : ''}.log`
    }

    logCategories.wrnLog = { appenders: ['wrn'], level: 'warn' };
  }

  return { logAppenders, logCategories };
}

function InitLogger(config: TLConfig) {
  const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 2 : 0), config.daily);

  log4js.configure({
    appenders: logg.logAppenders,
    categories: logg.logCategories
  });


  if(config.daily)
    cron.schedule(`1 0 0 * * *`, () => {
      const logg = SetupLogs(config.path, (config.level_error ? 1 : 0) + (config.level_warning ? 1 : 0), config.daily);

      log4js.configure({
        appenders: logg.logAppenders,
        categories: logg.logCategories
      });
    
      log = log4js.getLogger('log');
      logErr = log4js.getLogger('errLog');
      logWrn = log4js.getLogger('wrnLog');
    
      logger.log = log
      logger.logErr = logErr
      logger.logWrn = logWrn
    });
}

const logger: ILogger = {
  init: InitLogger,
  log,
  logErr,
  logWrn,
  info: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      log.info(message, params)
    } else {
      console.log(message)
      log.info(message)
    }
  },
  error: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      logErr.error(message, params)
    } else {
      console.log(message)
      logErr.error(message)
    }
  },
  warn: (message: any, ...params: any[]) => {
    if (params.length > 0) {
      console.log(message, params)
      logWrn.warn(message, params)
    } else {
      console.log(message)
      logWrn.warn(message)
    }
  },
  timersLabel: [],
  timers: [],
  time: (label: string) => {
    if (logger.timersLabel.indexOf(label) == -1) {
      logger.timersLabel.push(label)
      logger.timers.push(new Date(Date.now()).getTime())
    } else {
      console.log(`Timer ${label} já iniciado`)
      log.info(`Timer ${label} já iniciado`)
    }
  },
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
      console.log(`Timer ${label} não iniciado`)
      log.info(`Timer ${label} não iniciado`)
    }
  },
}

export default logger;

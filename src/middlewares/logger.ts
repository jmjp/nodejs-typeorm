import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { blue, blueBright , green, red } from 'chalk';


const getProcessingTimeInMS = (time: [number, number]): string => {
  return `${(time[0] * 1000 + time[1] / 1e6).toFixed(2)}ms`
}
function logger(req: Request, res: Response, next: NextFunction) {
  const id = uuidv4();

  const now = new Date();
  const timestamp = [
    now.getMonth() + 1,
    '-',
    now.getDate(),
    '-',
    now.getFullYear(),
    ' ',
    now.getHours(),
    ':',
    now.getMinutes(),
    ':',
    now.getSeconds()
  ].join('');

  const { method, path } = req;
  const start = process.hrtime();
  const startText = green(`START:${getProcessingTimeInMS(start)}`)
  const idText = blue(`[${id}]`);
  const timeStampText = blueBright(`[${timestamp}]`);
  console.log(`${idText}${timeStampText} ${method}:${path} ${startText}`);

  res.once('finish', () => {
    const end = process.hrtime(start);
    const endText = red(`END:${getProcessingTimeInMS(end)}`);
    console.log(`${idText}${timeStampText} ${method}:${path} ${res.statusCode} ${endText}`);
  });
  next();
};

export default logger;
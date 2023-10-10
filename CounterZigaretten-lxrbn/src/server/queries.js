import HttpError from '@wasp/core/HttpError.js'

export const getTodayLog = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const today = new Date().toISOString().slice(0, 10);

  return context.entities.ConsumptionLog.findUnique({
    where: {
      userId_date: {
        userId: context.user.id,
        date: today
      }
    },
    select: {
      id: true,
      ZCount: true,
      JCount: true,
      BCount: true
    }
  });
}

export const getMonthlyLog = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId, month } = args;
  // Logic to fetch and return ConsumptionLogs for the specified month
}

export const getYearlyLog = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { userId, year } = args;

  const consumptionLogs = await context.entities.ConsumptionLog.findMany({
    where: {
      userId,
      date: {
        startsWith: year
      }
    }
  });

  return consumptionLogs;
}
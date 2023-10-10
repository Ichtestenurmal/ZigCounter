import HttpError from '@wasp/core/HttpError.js'

export const logConsumption = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const today = new Date().toISOString().split('T')[0];
  let log = await context.entities.ConsumptionLog.findUnique({
    where: { userId_date: { userId: context.user.id, date: today } }
  });

  if (!log) {
    log = await context.entities.ConsumptionLog.create({
      data: {
        date: today,
        ZCount: args.ZCount,
        JCount: args.JCount,
        BCount: args.BCount,
        user: { connect: { id: context.user.id } }
      }
    });
  } else {
    log = await context.entities.ConsumptionLog.update({
      where: { id: log.id },
      data: {
        ZCount: args.ZCount,
        JCount: args.JCount,
        BCount: args.BCount
      }
    });
  }

  return log;
}

export const resetDailyCounts = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const users = await context.entities.User.findMany();

  for (const user of users) {
    await context.entities.ConsumptionLog.updateMany({
      where: { userId: user.id },
      data: { ZCount: 0, JCount: 0, BCount: 0 }
    });
  }

  return true;
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getYearlyLog from '@wasp/queries/getYearlyLog';
import resetDailyCounts from '@wasp/actions/resetDailyCounts';

export function YearlyOverview() {
  const { data: yearlyLog, isLoading, error } = useQuery(getYearlyLog);
  const resetDailyCountsFn = useAction(resetDailyCounts);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {yearlyLog.map((log) => (
        <div
          key={log.date}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{log.date}</div>
          <div>Z: {log.ZCount}</div>
          <div>J: {log.JCount}</div>
          <div>B: {log.BCount}</div>
          <div>
            <button
              onClick={() => resetDailyCountsFn({ date: log.date })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Reset
            </button>
            <Link
              to={`/month/${log.date}`} // TODO: Replace with actual route
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Monthly Overview
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
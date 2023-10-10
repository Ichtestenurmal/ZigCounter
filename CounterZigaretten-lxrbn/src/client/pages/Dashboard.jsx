import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import logConsumption from '@wasp/actions/logConsumption';
import getTodayLog from '@wasp/queries/getTodayLog';

export function Dashboard() {
  const [countZ, setCountZ] = useState(0);

  const handleIncrement = () => {
    setCountZ(countZ + 1);
    logConsumption({ ZCount: countZ + 1 });
  };

  const handleDecrement = () => {
    if (countZ > 0) {
      setCountZ(countZ - 1);
      logConsumption({ ZCount: countZ - 1 });
    }
  };

  const { data: todayLog, isLoading, error } = useQuery(getTodayLog);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='text-4xl font-bold'>Z: {countZ}</div>
      <div className='flex gap-x-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleIncrement}
          onTouchStart={handleIncrement}
          onTouchEnd={handleDecrement}
        >
          +
        </button>
        <button
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleDecrement}
          onTouchStart={handleDecrement}
          onTouchEnd={handleIncrement}
        >
          -
        </button>
      </div>
      <div className='mt-4'>
        Today's Log: {todayLog ? `ZCount: ${todayLog.ZCount}` : 'No data'}
      </div>
    </div>
  );
}
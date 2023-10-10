import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getMonthlyLog from '@wasp/queries/getMonthlyLog';

export function MonthlyOverview() {
  const { month } = useParams();
  const { data: monthlyLog, isLoading, error } = useQuery(getMonthlyLog, { month });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className=''>
      {/* TODO: Render the monthly calendar with the total counts of Z, J, B for each day of the specified month */}
    </div>
  );
}
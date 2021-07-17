import { useState } from 'react';
import { format, getYear, getWeek } from 'date-fns';

import Nav from '@/components/nav';
import Container from '@/components/container';
// import AllTxnsByDay from '@/components/charts/day/all-txns';

function formatWeekNumber(weekNumber: number) {
  return weekNumber.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function generateYears(numberOfYears: number) {
  const currentYear = getYear(new Date());
  const years = [currentYear];
  for (let i = 1; i < numberOfYears; i += 1) {
    years.push(currentYear - i);
  }

  return years;
}

export default function VizPage() {
  const today = new Date();
  const [dashboardType, setDashboardType] = useState('day');
  const [day, setDay] = useState(format(today, 'yyyy-MM-dd'));
  const [week, setWeek] = useState(
    `${getYear(today)}-W${formatWeekNumber(getWeek(today))}`
  );
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));
  const [year, setYear] = useState('');

  const options = [
    {
      value: 'day',
      label: 'Day',
    },
    {
      value: 'week',
      label: 'Week',
    },
    {
      value: 'month',
      label: 'Month',
    },
    {
      value: 'year',
      label: 'Year',
    },
    {
      value: 'custom',
      label: 'Custom',
    },
  ];

  return (
    <>
      <Nav title="New" />
      <Container className="w-full lg:w-2/4">
        <div className="grid grid-cols-2 my-2">
          <div className="m-2">
            <label htmlFor="dashboardType" className="font-bold">
              Dashboard Type
            </label>
            <select
              id="dashboardType"
              value={dashboardType}
              className="block shadow border rounded w-full p-2"
              onChange={(e) => setDashboardType(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          {dashboardType === 'day' && (
            <div className="m-2">
              <label htmlFor="day" className="font-bold">
                Select Day
              </label>
              <input
                id="day"
                className="block shadow border rounded w-full p-2"
                type="date"
                name="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            </div>
          )}
          {dashboardType === 'week' && (
            <div className="m-2">
              <label htmlFor="week" className="font-bold">
                Select Week
              </label>
              <input
                id="week"
                className="shadow border rounded w-full p-2"
                type="week"
                name="week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
              />
            </div>
          )}
          {dashboardType === 'month' && (
            <div className="m-2">
              <label htmlFor="month" className="font-bold">
                Select Month
              </label>
              <input
                id="month"
                className="shadow border rounded w-full p-2"
                type="month"
                name="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </div>
          )}
          {dashboardType === 'year' && (
            <div className="m-2">
              <label htmlFor="year" className="font-bold">
                Select Year
              </label>
              <select
                id="year"
                value={year}
                className="shadow border rounded w-full p-2"
                onChange={(e) => setYear(e.target.value)}
              >
                {generateYears(11).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        {/* {dashboardType === 'day' && <AllTxnsByDay date={day} />} */}
      </Container>
    </>
  );
}

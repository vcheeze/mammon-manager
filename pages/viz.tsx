import { useState } from 'react';
import { format, getYear, getWeek } from 'date-fns';
import { Pane, SelectField, TextInputField, majorScale } from 'evergreen-ui';

import Container from '@/components/container';
import { DayDashboard, MonthDashboard } from '@/components/dashboard';

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
    <Container className="w-full lg:w-3/4">
      <Pane background="tint1" marginBottom={majorScale(2)}>
        <div className="grid grid-cols-2 my-2">
          <div className="m-2">
            <SelectField
              label="Dashboard Type"
              value={dashboardType}
              onChange={(e) => setDashboardType(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="m-2">
            {dashboardType === 'day' && (
              <TextInputField
                name="day"
                label="Select Day"
                type="date"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
            )}
            {dashboardType === 'week' && (
              <TextInputField
                name="week"
                label="Select Week"
                type="week"
                value={week}
                onChange={(e) => setWeek(e.target.value)}
              />
            )}
            {dashboardType === 'month' && (
              <TextInputField
                name="month"
                label="Select Month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            )}
            {dashboardType === 'year' && (
              <SelectField
                label="Select Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                {generateYears(11).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </SelectField>
            )}
          </div>
        </div>
      </Pane>
      {dashboardType === 'day' && <DayDashboard date={day} />}
      {dashboardType === 'month' && <MonthDashboard month={month} />}
    </Container>
  );
}

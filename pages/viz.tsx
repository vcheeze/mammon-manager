import { useState } from 'react';
import { format } from 'date-fns';
import { Pane, TextInputField, majorScale } from 'evergreen-ui';

import Container from '@/components/container';
import { MonthDashboard } from '@/components/dashboard';

export default function VizPage() {
  const today = new Date();
  const [month, setMonth] = useState(format(today, 'yyyy-MM'));

  return (
    <Container className="w-full lg:w-3/4">
      <Pane background="tint1" marginBottom={majorScale(2)}>
        <div className="grid grid-cols-2 my-2">
          <TextInputField
            name="month"
            label="Select Month"
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </Pane>
      <MonthDashboard month={month} />
    </Container>
  );
}

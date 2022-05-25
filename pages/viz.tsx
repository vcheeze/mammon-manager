import { Pane } from 'evergreen-ui';

import MonthDashboard from '@/components/dashboards/month';
import YearDashboard from '@/components/dashboards/year';

export default function VizPage() {
  return (
    <Pane>
      <MonthDashboard />
      <YearDashboard />
    </Pane>
  );
}

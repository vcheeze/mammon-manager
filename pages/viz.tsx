import Container from '@/components/container';
import MonthDashboard from '@/components/dashboards/month';
import YearDashboard from '@/components/dashboards/year';

export default function VizPage() {
  return (
    <Container className="w-full lg:w-3/4">
      <MonthDashboard />
      <YearDashboard />
    </Container>
  );
}

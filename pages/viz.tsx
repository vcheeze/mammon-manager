import Container from '@/components/container';
import MonthDashboard from '@/components/dashboards/month';

export default function VizPage() {
  return (
    <Container className="w-full lg:w-3/4">
      <MonthDashboard />
    </Container>
  );
}

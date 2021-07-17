/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Container from '@/components/container';

export default function Nav() {
  return (
    <Container className="py-4">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold">Home</a>
          </Link>
          <Link href="/viz">
            <a>Visualizations</a>
          </Link>
          <Link href="/add-transaction">
            <a>Add Transaction</a>
          </Link>
          <Link href="/add-category">
            <a>Add Category</a>
          </Link>
        </div>
      </nav>
    </Container>
  );
}

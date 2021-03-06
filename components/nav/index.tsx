/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import Container from '@/components/container'
import ButtonLink from '@/components/button-link'

export default function Nav({ title = 'Entries' }) {
  return (
    <Container className="py-4">
      <nav>
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="font-bold text-3xl">{title}</a>
          </Link>
          <Link href="/viz">
            <a>Visualizations</a>
          </Link>
          <ButtonLink href="/add-transaction">Add Transaction</ButtonLink>
        </div>
      </nav>
    </Container>
  )
}

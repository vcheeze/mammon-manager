import { useEffect, useState } from 'react'

import Nav from '@/components/nav'
import Container from '@/components/container'
import Button from '@/components/button'
import TxnByCategory from '@/components/charts/txn-by-category'

export default function VizPage() {
  const [chartType, setChartType] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const options = [
    {
      value: 'txnByCategory',
      label: 'Transactions by Category',
    },
    {
      value: 'allTxns',
      label: 'All Transactions',
    },
  ]

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    setSubmitting(false)
  }

  async function onChartTypeChange(e) {
    setChartType(e.target.value)
  }

  return (
    <>
      <Nav title="New" />
      <Container className="w-full lg:w-2/4">
        <form onSubmit={submitHandler}>
          <div className="my-4">
            <label htmlFor="chartType" className="font-bold">
              Chart Type
            </label>
            <select value={chartType} className="shadow border rounded w-full p-2" onChange={onChartTypeChange}>
              {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          {chartType === 'txnByCategory' && <TxnByCategory />}
        </form>
      </Container>
    </>
  )
}

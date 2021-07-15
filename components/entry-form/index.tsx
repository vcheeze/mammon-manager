import { useState } from 'react'
import Router from 'next/router'
import { format } from 'date-fns'

import Button from '@/components/button'

export default function EntryForm() {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState(0)
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [category, setCategory] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submitHandler(e) {
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/create-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount,
          date,
          category,
        }),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="my-4">
        <label htmlFor="name" className="font-bold">
          Name
        </label>
        <input
          id="name"
          className="shadow border rounded w-full p-2"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="amount" className="font-bold">
          Amount
        </label>
        <input
          id="amount"
          className="shadow border rounded w-full p-2"
          type="number"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(+e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="date" className="font-bold">
          Date
        </label>
        <input
          id="date"
          className="shadow border rounded w-full p-2"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="my-4">
        <label htmlFor="category" className="font-bold">
          Category
        </label>
        <input
          id="category"
          className="shadow border rounded w-full p-2"
          type="text"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <Button disabled={submitting} type="submit">
        {submitting ? 'Creating ...' : 'Create'}
      </Button>
    </form>
  )
}

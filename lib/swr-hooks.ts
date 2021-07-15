import useSWR from 'swr'

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json())
}

export function useTransactions() {
  const { data, error } = useSWR(`/api/get-transactions`, fetcher)

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useTransaction(id: string) {
  return useSWR(`/api/get-transaction?id=${id}`, fetcher)
}

export function useTxnByCategory() {
  const { data, error } = useSWR('/api/get-transactions-by-category', fetcher)

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export function useCategories() {
  const { data, error } = useSWR(`/api/get-categories`, fetcher)

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  }
}

import useSWR from 'swr';

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

export function useTransactions() {
  const { data, error } = useSWR(`/api/get-transactions`, fetcher);

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useTransaction(id: string) {
  return useSWR(`/api/get-transaction?id=${id}`, fetcher);
}

export function useCategoryTotals(date: string | undefined) {
  const { data, error } = useSWR(
    `/api/get-category-totals?date=${date}`,
    fetcher
  );

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useTransactionsByDay(date: string) {
  const { data, error } = useSWR(
    `/api/get-transactions-by-day?date=${date}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useTransactionsByMonth(month: string) {
  const firstDayOfMonth = `${month}-01`;
  const { data, error } = useSWR(
    `/api/get-transactions-by-month?firstDayOfMonth=${firstDayOfMonth}`,
    fetcher
  );

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCategories() {
  const { data, error } = useSWR(`/api/get-categories`, fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

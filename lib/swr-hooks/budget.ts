import useSWR from 'swr';

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

export function useBudgets() {
  const { data, error, mutate } = useSWR(`/api/budget`, fetcher);

  return {
    budgets: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useBudgetsByMonth(month: string) {
  const firstDayOfMonth = `${month}-01`;
  const { data, error } = useSWR(
    `/api/budget/get-by-month?firstDayOfMonth=${firstDayOfMonth}`,
    fetcher
  );

  return {
    budgets: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBudgetsByMonthAndCat(month: string, category: string) {
  const firstDayOfMonth = `${month}-01`;
  const { data, error } = useSWR(
    `/api/budget/get-by-month-and-cat?firstDayOfMonth=${firstDayOfMonth}&category=${category}`,
    fetcher
  );

  return {
    budget: data,
    isLoading: !error && !data,
    isError: error,
  };
}

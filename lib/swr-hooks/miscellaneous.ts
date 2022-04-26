import useSWR from 'swr';

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

// eslint-disable-next-line import/prefer-default-export
export function useCurrencies() {
  const { data, error } = useSWR(`/api/currencies`, fetcher);

  return {
    currencies: data,
    isLoading: !error && !data,
    isError: error,
  };
}

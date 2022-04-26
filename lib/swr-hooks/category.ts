import useSWR from 'swr';

function fetcher(url: string) {
  return window.fetch(url).then((res) => res.json());
}

// eslint-disable-next-line import/prefer-default-export
export function useCategories() {
  const { data, error, mutate } = useSWR(`/api/category`, fetcher);

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

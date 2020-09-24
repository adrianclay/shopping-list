import { useEffect, useState } from "react";

function _useService<T, Y>(service: (request: Y, onUpdate: (update: T) => void, onError: () => void) => () => void) {
  return function useService(initialState: T, request: Y) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState(false);
    const [fetchedData, setFetchedData] = useState<T>(initialState);

    useEffect(() => {
      return service(request, fetchedData => {
        setIsLoading(false);
        setFetchedData(fetchedData);
      }, () => {
        setFetchError(true);
      });
    }, [request]);
    return [isLoading, fetchErrored, fetchedData] as const;
  }
}

export default _useService;

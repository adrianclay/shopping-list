import { useEffect, useState } from "react";

function _useService<T, Y>(service: (request: Y, onUpdate: (update: T) => void, onError: (error: Error) => void) => () => void) {
  return function useService(initialState: T, request: Y) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState<Error|null>(null);
    const [fetchedData, setFetchedData] = useState<T>(initialState);

    useEffect(() => {
      return service(request, fetchedData => {
        setIsLoading(false);
        setFetchedData(fetchedData);
      }, (error) => {
        setFetchError(error);
      });
    }, [request]);
    return [isLoading, fetchErrored, fetchedData] as const;
  }
}

export default _useService;

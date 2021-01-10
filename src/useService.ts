import { useEffect, useState } from "react";

export type RealtimeService<R, D> = (request: R, onUpdate: (update: D) => void, onError: (error: Error) => void) => () => void;

function _useService<R, D>(service: RealtimeService<R, D>) {
  return function useService(initialState: D, request: R) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchErrored, setFetchError] = useState<Error|null>(null);
    const [fetchedData, setFetchedData] = useState<D>(initialState);

    useEffect(() => {
      return service(request, fetchedData => {
        setIsLoading(false);
        setFetchedData(fetchedData);
      }, (error) => {
        setIsLoading(false);
        setFetchError(error);
      });
    }, [request]);
    return [isLoading, fetchErrored, fetchedData] as const;
  }
}

export default _useService;

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { act } from '@testing-library/react';
import { RealtimeService } from './useService';

export function realtimeServiceStub<R, D>() {
  type MockArgs = [R, (update: D) => void, (error: Error) => void];
  type MockReturn = () => void;

  const unsubscribeSpy = jest.fn<void, []>();
  const service_mock = jest.fn<MockReturn, MockArgs>(() => unsubscribeSpy);
  const lastInvocation = () => {
    const calls = service_mock.mock.calls;
    return calls[calls.length - 1];
  };

  return {
    unsubscribeSpy,
    service: service_mock,
    performUpdate: (update: D) => {
      act(() => {
        const onUpdate = lastInvocation()[1];
        onUpdate(update);
      });
    },
    performError: (error: Error) => {
      act(() => {
        const onError = lastInvocation()[2];
        onError(error);
      });
    }
  };
}

export function fetchFromRealtimeService<Request, Domain>(service: RealtimeService<Request, Domain>, request: Request) {
  return new Promise<Domain>((resolve, reject) => {
    const unsubscribe = service(request, domain => {
      unsubscribe();
      resolve(domain);
    }, reject);
  });
}

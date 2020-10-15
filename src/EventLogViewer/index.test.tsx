import React from "react";
import { render, screen } from "@testing-library/react";
import _EventLogViewer from ".";
import ShoppingList from "../domain/ShoppingList";
import ShoppingListEvent from "../domain/ShoppingListEvent";
import { realtimeServiceStub } from "../setupTests";
import ShoppingListFactory from "../factories/ShoppingList";

const eventLogFetcherStub = realtimeServiceStub<ShoppingList, ShoppingListEvent[]>();
const EventLogViewer = _EventLogViewer(eventLogFetcherStub.service);
const shoppingList = ShoppingListFactory.build();

test('displays "No activity yet" when given no events', () => {
  render(<EventLogViewer shoppingList={shoppingList} />);

  eventLogFetcherStub.performUpdate([]);

  expect(screen.getByText(/no activity yet/i)).toBeInTheDocument();
});

test('displays "loading" when still loading evengs', () => {
  render(<EventLogViewer shoppingList={shoppingList} />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('displays "Errored" when errored', () => {
  render(<EventLogViewer shoppingList={shoppingList} />);

  eventLogFetcherStub.performError(new Error('fun'));
  expect(screen.getByText(/Errored/i)).toBeInTheDocument();
});

describe('with two events', () => {
  beforeEach(() => {
    render(<EventLogViewer shoppingList={shoppingList} />);
    eventLogFetcherStub.performUpdate([
      { list: shoppingList, type: 'item_added',   item: { id: 'xxx', name: 'yyy' }, created_on: new Date() },
      { list: shoppingList, type: 'item_bought', item: { id: 'xxx', name: 'yyy' }, created_on: new Date() },
    ]);
  });

  test('displays first event', () => {
    expect(screen.getByText(/yyy was added/)).toBeInTheDocument();
  });

  test('displays second event', () => {
    expect(screen.getByText(/yyy was bought/)).toBeInTheDocument();
  });
});

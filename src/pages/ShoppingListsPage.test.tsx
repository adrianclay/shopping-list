import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import _ShoppingListsPage from "./ShoppingListsPage";

const ShoppingListSelectorStub = jest.fn<JSX.Element, []>(() => <p>ShoppingListSelector</p>);

const ShoppingListsPage = _ShoppingListsPage(
  ShoppingListSelectorStub
);

beforeEach(() => {
  ShoppingListSelectorStub.mockClear();
});

describe('Visiting /', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ShoppingListsPage />
      </MemoryRouter>
    );
  });

  test('renders the ShoppingListSelector', () => {
    expect(ShoppingListSelectorStub).toHaveBeenCalled();
  });
});

describe('Visiting a non-matching URL', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/i-love-cake']}>
        <ShoppingListsPage />
      </MemoryRouter>
    );
  });

  test('does not render the ShoppingListSelector', async () => {
    expect(ShoppingListSelectorStub).not.toHaveBeenCalled();
  });
});

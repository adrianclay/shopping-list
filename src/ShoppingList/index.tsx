import { Segment } from "semantic-ui-react";

import ShoppingList from "../domain/ShoppingList";

import { AddItemFormProps } from "./AddItemForm";
import { EventLogViewerProps } from "./EventLogViewer";
import { ItemListProps } from "./ItemList";

export interface ShoppingListProps {
  shoppingList: ShoppingList;
}

function _ShoppingList(
  AddItemForm: React.FunctionComponent<AddItemFormProps>,
  ItemList: React.FunctionComponent<ItemListProps>,
  EventLogViewer: React.FunctionComponent<EventLogViewerProps>,
) {
  return function ShoppingList({ shoppingList } : ShoppingListProps) {
    return <>
      <h2>Items</h2>
      <Segment.Group>
        <AddItemForm shoppingList={shoppingList} />
        <ItemList shoppingList={shoppingList} />
      </Segment.Group>
      <h2>History</h2>
      <Segment.Group>
        <EventLogViewer shoppingList={shoppingList} />
      </Segment.Group>
    </>;
  };
}

export default _ShoppingList;

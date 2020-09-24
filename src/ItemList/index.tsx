import React, {useState} from "react";
import { Segment, Button, Icon, Header, Loader, Dimmer, Label } from "semantic-ui-react";
import _useService from "../useService";
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from "../domain/ShoppingList";
import { EditItemFormProps } from "./EditItemForm";

type ShoppingListItemFetcher = (shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void) => () => void;

export interface ItemListProps {
  shoppingList: ShoppingList;
}

function ItemListConstructor(
  subscribeToItemChanges: ShoppingListItemFetcher,
  deleteItem: (shoppingListItem: ShoppingListItem) => void,
  EditItemForm: React.FunctionComponent<EditItemFormProps>,
  ) {
  const useService = _useService(subscribeToItemChanges);

  return function ItemList({ shoppingList } : ItemListProps) {
    const [isLoading, fetchError, shoppingListItems] = useService([], shoppingList);

    if (fetchError) {
      return <p>Error: {fetchError.message}</p>;
    }

    if (isLoading) {
      return <Segment placeholder>
        <Dimmer active inverted>
          <Loader inverted>
            Loading {shoppingList.name} items.
          </Loader>
        </Dimmer>
      </Segment>;
    }

    if (shoppingListItems.length === 0) {
      return <Segment placeholder>
        <Header icon>
          <Icon name="shopping basket" />
          No items in {shoppingList.name}.
        </Header>
      </Segment>;
    }

    return <> { shoppingListItems.map(item => <Segment clearing key={item.id}><ListItem item={item} /></Segment>) } </>;
  }

  function ListItem({ item } : { item: ShoppingListItem }) {
    const [isEditing, setIsEditing] = useState(false);

    if(isEditing) {
      return <EditItemForm item={item} onSave={() => setIsEditing(false)} />;
    }

    return <>
      {item.name} {quantity(item)}
      <Button floated={"right"} size="mini" onClick={() => deleteItem(item)}>
        Delete
      </Button>
      <Button floated={"right"} size="mini" onClick={() => setIsEditing(true)}>
        Edit
      </Button>
    </>;
  }

  function quantity(item: ShoppingListItem) {
    if(item.quantity) {
      return <Label circular style={{ marginLeft: '1em' }}>
        {item.quantity?.scalar}
        {item.quantity?.units}
      </Label>;
    }
  }
};

export default ItemListConstructor;

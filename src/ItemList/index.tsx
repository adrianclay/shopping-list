import React, {useEffect, useState} from "react";
import ShoppingListItem from '../domain/ShoppingListItem';
import ShoppingList from "../domain/ShoppingList";
import { Segment, Button, Icon, Header, Loader, Dimmer, Form, Input, Label } from "semantic-ui-react";
import UnitsSelector from "./UnitsSelector";

interface ShoppingListItemFetcher {
  subscribeToItemChanges(shoppingList: ShoppingList, onUpdate: (items: ShoppingListItem[]) => void, onError: (error: Error) => void): () => void;
}

interface ShoppingListItemDeleter {
  deleteItem(shoppingListItem: ShoppingListItem): void;
}

interface ShoppingListItemUpdater {
  updateItem(shoppingListItem: ShoppingListItem): Promise<unknown>;
}

export interface ItemListProps {
  shoppingList: ShoppingList;
}

function ItemListConstructor(
  shoppingListItemFetcher: ShoppingListItemFetcher,
  shoppingListItemDeleter: ShoppingListItemDeleter,
  shoppingListItemUpdater: ShoppingListItemUpdater,
  ) {
  return function ItemList({ shoppingList } : ItemListProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<Error|undefined>(undefined);
    const [shoppingListItems, setShoppingListItems] = useState([] as ShoppingListItem[]);

    useEffect(() => {
      return shoppingListItemFetcher.subscribeToItemChanges(shoppingList, stuff => {
        setIsLoading(false);
        setShoppingListItems(stuff);
      }, (error) => {
        setFetchError(error);
      });
    }, [shoppingList]);

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
    const [itemName, setItemName] = useState(item.name);
    const [itemQuantityScalar, setQuantityScalar] = useState(item.quantity?.scalar);
    const [itemQuantityUnits, setQuantityUnits] = useState(item.quantity?.units);
    const [isEditing, setIsEditing] = useState(false);

    if(isEditing) {
      return <Form>
        <Form.Field>
          <label>
            Name
            <Input value={itemName} onChange={({ target }) => setItemName(target.value) } />
          </label>
        </Form.Field>
        <Form.Group inline>
          <Form.Field>
            <label>
              Quantity
              <Input value={itemQuantityScalar} onChange={({ target }) => setQuantityScalar(Number.parseInt(target.value)) } style={{paddingLeft: '1em'}} />
            </label>
          </Form.Field>
          <Form.Field>
            <UnitsSelector value={itemQuantityUnits} onChange={setQuantityUnits}/>
          </Form.Field>
        </Form.Group>
        <Button type="submit" onClick={async () => {
          const updatedItem = {
            ...item,
            name: itemName
          };
          if(itemQuantityScalar) {
            updatedItem.quantity = {
              scalar: itemQuantityScalar
            }
            if(itemQuantityUnits) {
              updatedItem.quantity.units = itemQuantityUnits
            }
          }
          await shoppingListItemUpdater.updateItem(updatedItem);
          setIsEditing(false);
        }}>Save</Button>
      </Form>;
    }

    return <>
      {item.name} {quantity(item)}
      <Button floated={"right"} size="mini" onClick={() => shoppingListItemDeleter.deleteItem(item)}>
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

import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import ItemQuantity from "../../domain/ItemQuantity";

import UnitsSelector from "../UnitsSelector";

interface Item {
  name: string;
  quantity?: ItemQuantity;
  list: {
    id: string;
  }
};

interface ShoppingListItemUpdater {
  updateItem(shoppingListItem: Item): Promise<unknown>;
}

export interface EditItemFormProps {
  item: Item;
  onSave: () => void;
}

function EditItemFormConstructor(
  shoppingListItemUpdater: ShoppingListItemUpdater,
) {
  return function EditItemForm({ item, onSave } : EditItemFormProps) {
    const [itemName, setItemName] = useState(item.name);
    const [itemQuantityScalar, setQuantityScalar] = useState(item.quantity?.scalar.toString() || '');
    const [itemQuantityUnits, setQuantityUnits] = useState(item.quantity?.units);

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
            <Input value={itemQuantityScalar} onChange={({ target }) => setQuantityScalar(target.value)} style={{paddingLeft: '1em'}} />
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
        const scalar = Number.parseInt(itemQuantityScalar);
        if(scalar) {
          updatedItem.quantity = { scalar }
          if(itemQuantityUnits) {
            updatedItem.quantity.units = itemQuantityUnits
          }
        }
        await shoppingListItemUpdater.updateItem(updatedItem);
        onSave();
      }}>Save</Button>
    </Form>;
  };
}

export default EditItemFormConstructor;

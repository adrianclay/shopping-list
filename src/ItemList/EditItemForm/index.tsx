import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";

import ShoppingListItem from "../../domain/ShoppingListItem";
import UnitsSelector from "../UnitsSelector";
import { ShoppingListItemUpdater } from "..";

function EditItemFormConstructor(
  shoppingListItemUpdater: ShoppingListItemUpdater,
) {
  return function EditItemForm({ item, onSave } : { item: ShoppingListItem, onSave: () => void }) {
    const [itemName, setItemName] = useState(item.name);
    const [itemQuantityScalar, setQuantityScalar] = useState(item.quantity?.scalar);
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
        onSave();
      }}>Save</Button>
    </Form>;
  };
}

export default EditItemFormConstructor;

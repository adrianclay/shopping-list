import React, {useState} from "react";
import { Button, Input, Form } from 'semantic-ui-react'
import ShoppingList from "../domain/ShoppingList";

interface ShoppingListItemAdder {
  addShoppingListItem(item: { name: string, list: ShoppingList }): void
}

export interface AddItemFormProps {
  shoppingList: ShoppingList;
}

function AddItemFormConstructor(shoppingListItemAdder: ShoppingListItemAdder) {
  return function AddItemForm({ shoppingList } : AddItemFormProps) {
    const [itemName, setItemName] = useState('')

    const addItem = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      shoppingListItemAdder.addShoppingListItem({
        name: itemName,
        list: shoppingList
      });
      setItemName('');
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setItemName(event.target.value);
    };

    return (
      <Form>
        <Form.Group inline>
          <Form.Field>
            <label>
              Item
              <Input type="text" onChange={onChange} value={itemName}/>
            </label>
          </Form.Field>
          <Form.Field>
            <Button onClick={addItem}>
              Add
            </Button>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  }
}

export default AddItemFormConstructor;

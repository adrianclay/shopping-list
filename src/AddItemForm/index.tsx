import React, {useState} from "react";
import { Button, Input, Form } from 'semantic-ui-react'
import ShoppingListItem from '../domain/ShoppingListItem';

interface ShoppingListItemAdder {
  addShoppingListItem(item: ShoppingListItem): void
}

interface AddItemFormProps {
  shoppingListItemAdder: ShoppingListItemAdder
}

function AddItemForm({shoppingListItemAdder}: AddItemFormProps) {
  const [itemName, setItemName] = useState('')

  const addItem = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    shoppingListItemAdder.addShoppingListItem({
      name: itemName,
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

export default AddItemForm;

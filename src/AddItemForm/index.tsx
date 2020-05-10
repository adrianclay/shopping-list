import React, {useState} from "react";
import { ShoppingListItem } from '../App'

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
    <form>
      <label>
        Item
        <input type="text" onChange={onChange} value={itemName}/>
      </label>
      <button onClick={addItem}>
        Add
      </button>
    </form>
  );
}

export default AddItemForm;

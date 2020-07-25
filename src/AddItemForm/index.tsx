import React, {useState} from "react";
import { Button, Form, Segment, Dropdown } from 'semantic-ui-react'
import ShoppingList from "../domain/ShoppingList";
import ShoppingListItem from "../domain/ShoppingListItem";

export interface ItemToAdd {
  name: string;
  list: ShoppingList;
}

interface ShoppingListItemAdder {
  addShoppingListItem(item: ItemToAdd): void
}

interface ShoppingListItemSearcher {
  searchForItems(shoppingList: ShoppingList, query: string): Promise<ShoppingListItem[]>
}

export interface AddItemFormProps {
  shoppingList: ShoppingList;
}

function AddItemFormConstructor(
  shoppingListItemAdder: ShoppingListItemAdder,
  shoppingListItemSearcher: ShoppingListItemSearcher
) {
  return function AddItemForm({ shoppingList } : AddItemFormProps) {
    const [itemName, setItemName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState<ShoppingListItem[]>([]);

    const addItem = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();

      shoppingListItemAdder.addShoppingListItem({
        name: itemName,
        list: shoppingList
      });
      setItemName('');
    };

    const dropdownOptions = () => {
      const dropdownOptions = options.map(i => {return {
        key: i.id,
        text: i.name,
        value: i.name,
      }});
      if(itemName !== "" && !dropdownOptions.find(o => o.value === itemName)) {
        dropdownOptions.push({
          key: itemName,
          text: itemName,
          value: itemName,
        });
      }
      return dropdownOptions;
    };

    const updateOptions = async (searchQuery: string) => {
      setIsLoading(true);
      setOptions(await shoppingListItemSearcher.searchForItems(shoppingList, searchQuery));
      setIsLoading(false);
    };

    return (
      <Segment>
        <Form>
          <Form.Group inline>
            <Form.Field>
              Item
              <Dropdown allowAdditions search selection
                loading={isLoading}
                options={dropdownOptions()}
                onSearchChange={(_e, { searchQuery }) => updateOptions(searchQuery)}
                onChange={(_e, {value}) => setItemName(value as string)}
                value={itemName} />
            </Form.Field>
            <Form.Field>
              <Button onClick={addItem}>
                Add
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

export default AddItemFormConstructor;

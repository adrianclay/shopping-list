import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import User from "../domain/User";
import ShoppingList from "../domain/ShoppingList";

export interface CreateShoppingListFormProps {
  loggedInUser: User;
  onCreate?: (list: ShoppingList) => void;
}

function CreateShoppingListFormConstructor(addShoppingList: (shoppingList: { name: string, owner_uids: string[] }) => Promise<ShoppingList>) {
  return function CreateShoppingListForm({ loggedInUser, onCreate }: CreateShoppingListFormProps) {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      const list = await addShoppingList({ name, owner_uids: [loggedInUser.uid] });
      setIsLoading(false);
      if (onCreate) {
        onCreate(list);
      }
    };

    const nameChangeHandler = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      setName(target.value)
    };

    return (<Form onSubmit={submitHandler}>
      <Form.Field>
        <label>
          Name
          <input onChange={nameChangeHandler} value={name} />
        </label>
      </Form.Field>
      <Button loading={isLoading}>{isLoading ? 'Loading' : 'Create'}</Button>
    </Form>);
  }
}

export default CreateShoppingListFormConstructor;

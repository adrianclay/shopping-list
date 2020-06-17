import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import User from "../domain/User";

interface ShoppingListAdder {
  addShoppingList: (shoppingList: { name: string, owner_uids: string[] }) => Promise<unknown>
}

export interface CreateShoppingListFormProps {
  loggedInUser: User;
}

function CreateShoppingListFormConstructor(shoppingListAdder: ShoppingListAdder) {
  return function CreateShoppingListForm({ loggedInUser }: CreateShoppingListFormProps) {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsLoading(true);
      await shoppingListAdder.addShoppingList({ name, owner_uids: [loggedInUser.uid] });
      setIsLoading(false);
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

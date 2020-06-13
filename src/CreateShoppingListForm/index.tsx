import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import User from "../domain/User";

interface ShoppingListAdder {
  addShoppingList: (shoppingList: { name: string, owner_uids: string[] }) => void
}

export interface CreateShoppingListFormProps {
  loggedInUser: User;
}

function CreateShoppingListFormConstructor(shoppingListAdder: ShoppingListAdder) {
  return function CreateShoppingListForm({ loggedInUser }: CreateShoppingListFormProps) {
    const [name, setName] = useState('');

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      shoppingListAdder.addShoppingList({ name, owner_uids: [loggedInUser.uid] });
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
      <Button>Create</Button>
    </Form>);
  }
}

export default CreateShoppingListFormConstructor;

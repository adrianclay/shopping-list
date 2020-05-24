import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

interface CreateShoppingListFormProps {
  shoppingListAdder: {
    addShoppingList: (shoppingList: { name: string }) => void
  }
}

function CreateShoppingListForm({shoppingListAdder}: CreateShoppingListFormProps) {
  const [name, setName] = useState('');

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    shoppingListAdder.addShoppingList({ name });
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

export default CreateShoppingListForm;

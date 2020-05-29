import React, { useState } from "react";
import ShoppingList from "../domain/ShoppingList";
import { AddItemFormProps } from "../AddItemForm";
import { ItemListProps } from "../ItemList";
import { ListSelectorProps } from "../ListSelector";

function ShoppingListViewerConstructor(ListSelector: React.FunctionComponent<ListSelectorProps>, AddItemForm: React.FunctionComponent<AddItemFormProps>, ItemList: React.FunctionComponent<ItemListProps>) {
  return function ShoppingListViewer() {
    const [shoppingList, setShoppingList] = useState<ShoppingList|undefined>();

    const itemList = () => {
      if(shoppingList) {
        return (<div>
          <AddItemForm shoppingList={shoppingList} />
          <ItemList shoppingList={shoppingList} />
        </div>);
      }
    }

    const onListSelect = (list: ShoppingList) => {
      setShoppingList(list);
    };

    return (<div>
      <ListSelector onSelect={onListSelect} />
      {itemList()}
    </div>);
  }
}

export default ShoppingListViewerConstructor;

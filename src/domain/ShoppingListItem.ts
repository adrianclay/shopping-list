import ShoppingList from "./ShoppingList";
import UnitsOfMeasurement from "./UnitsOfMeasurement";

export default interface ShoppingListItem {
  list: ShoppingList;
  id: string;
  name: string;
  quantity?: {
    scalar: number;
    units?: UnitsOfMeasurement;
  }
}

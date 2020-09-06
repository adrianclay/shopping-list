import UnitsOfMeasurement from "./UnitsOfMeasurement";

export default interface ItemQuantity {
  scalar: number;
  units?: UnitsOfMeasurement;
}

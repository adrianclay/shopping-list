
import _EventLogViewer from ".";
import ShoppingListEvent from "../../domain/ShoppingListEvent";
import ShoppingListFactory from "../../factories/ShoppingList";
import { days, hours, minutes } from "../../RelativeTime/periods";

const list = ShoppingListFactory.build();
const events : ShoppingListEvent[] = [
  {
    list,
    type: 'item_added',
    item: {
      name: 'Peas',
      id: 'peaz'
    },
    created_on: new Date(Date.now() - 3 * days)
  },
  {
    list,
    type: 'item_bought',
    item: {
      name: 'Pudding',
      id: 'puddin'
    },
    created_on: new Date(Date.now() - 2 * hours)
  },
  {
    list,
    type: 'item_added',
    item: {
      name: 'Pudding',
      id: 'puddin'
    },
    created_on: new Date(Date.now() - 15 * minutes)
  }
];

const EventLogViewer = _EventLogViewer((_a, onUpdate, _b) => {
  onUpdate(events);
  return () => {}
});

const EventLogViewerStories = {
  title: 'EventLogViewer',
  component: EventLogViewer,
};
export default EventLogViewerStories;

export const Example = () => <EventLogViewer shoppingList={list} />

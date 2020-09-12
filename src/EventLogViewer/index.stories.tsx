import React from "react";

import EventLogViewer from ".";
import ShoppingListEvent from "../domain/ShoppingListEvent";
import { days, hours, minutes } from "../RelativeTime/periods";

export default {
  title: 'EventLogViewer',
  component: EventLogViewer,
};

const events : ShoppingListEvent[] = [
  {
    type: 'added',
    item: {
      name: 'Peas',
      id: 'peaz'
    },
    created_on: new Date(Date.now() - 3 * days)
  },
  {
    type: 'deleted',
    item: {
      name: 'Pudding',
      id: 'puddin'
    },
    created_on: new Date(Date.now() - 2 * hours)
  },
  {
    type: 'added',
    item: {
      name: 'Pudding',
      id: 'puddin'
    },
    created_on: new Date(Date.now() - 15 * minutes)
  }
];

export const Example = () => <EventLogViewer events={events} />

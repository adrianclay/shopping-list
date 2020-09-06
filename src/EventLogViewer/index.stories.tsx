import React from "react";
import EventLogViewer, { Event } from ".";

export default {
  title: 'EventLogViewer',
  component: EventLogViewer,
};

const milliseconds = 1;
const seconds = 1000 * milliseconds;
const minutes = 60 * seconds;
const hours = 60 * minutes;
const days = 24 * hours;

const events : Event[] = [
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

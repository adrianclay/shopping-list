import React from "react";
import { List } from "semantic-ui-react";

export interface Event {
  type: 'added' | 'deleted';
  item: {
    name: string;
    id: string;
  },
  created_on: Date;
};

const LogEntry = ({ event }: { event: Event }) => {
  return <List.Item>
    {`${event.item.name} ${event.type} ${event.created_on.toISOString()} `}
  </List.Item>;
};

const EventLogViewer = ({ events }: { events: Event[] }) => <List>
  { events.map(event => <LogEntry event={event} />)}
</List>;

export default EventLogViewer;

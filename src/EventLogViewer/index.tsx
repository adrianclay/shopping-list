import React from "react";
import { List } from "semantic-ui-react";

import RelativeTime from "../RelativeTime";

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
    {`${event.item.name} ${event.type} `}
    <RelativeTime time={event.created_on} />
  </List.Item>;
};

const EventLogViewer = ({ events }: { events: Event[] }) => <List>
  { events.map(event => <LogEntry event={event} />)}
</List>;

export default EventLogViewer;

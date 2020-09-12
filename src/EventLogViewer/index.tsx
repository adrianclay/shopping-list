import React from "react";
import { List } from "semantic-ui-react";

import ShoppingListEvent from "../domain/ShoppingListEvent";
import RelativeTime from "../RelativeTime";

const LogEntry = ({ event }: { event: ShoppingListEvent }) => {
  return <List.Item>
    {`${event.item.name} ${event.type} `}
    <RelativeTime time={event.created_on} />
  </List.Item>;
};

const EventLogViewer = ({ events }: { events: ShoppingListEvent[] }) => <List>
  { events.map(event => <LogEntry event={event} />)}
</List>;

export default EventLogViewer;

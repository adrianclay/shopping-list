import React from "react";
import { List } from "semantic-ui-react";
import ShoppingList from "../domain/ShoppingList";

import ShoppingListEvent from "../domain/ShoppingListEvent";
import RelativeTime from "../RelativeTime";
import _useService, { RealtimeService } from "../useService";

const LogEntry = ({ event }: { event: ShoppingListEvent }) => {
  return <List.Item>
    {`${event.item.name} was ${typeDescription(event)} `}
    <RelativeTime time={event.created_on} />
  </List.Item>;
};

const typeDescription = (event: ShoppingListEvent) : string => {
  switch(event.type) {
    case "item_added":
      return "added";
    case "item_deleted":
      return "deleted";
  }
}

const _EventLogViewer = (eventLogFetcher: RealtimeService<ShoppingList, ShoppingListEvent[]>) => {
  const useService = _useService(eventLogFetcher);

  return function EventViewer({ shoppingList }: { shoppingList: ShoppingList }) {
    const [isLoading, fetchError, events] = useService([], shoppingList);

    if(fetchError) {
      return <div>Errored</div>;
    }

    if(isLoading) {
      return <div>Loading</div>;
    }

    if(events.length === 0) {
      return <div>No activity yet.</div>;
    }

    return <List>
      { events.map(event => <LogEntry event={event} />)}
    </List>;
  };
};

export default _EventLogViewer;

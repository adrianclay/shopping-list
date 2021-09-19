import { render, screen } from "@testing-library/react";

import RelativeTime from ".";
import { days, hours, minutes, seconds, weeks } from "./periods";

test('populates datetime attribute', () => {
  render(<RelativeTime time={new Date(1577840461000)}/>);
  expect(screen.getByText(/.+/)).toHaveAttribute('datetime', '2020-01-01T01:01:01.000Z');
});

test.each([
  ['now', 0 * seconds],
  ['10 seconds ago', 10 * seconds],
  ['10 minutes ago', 10 * minutes],
  ['2 hours ago', 2 * hours],
  ['6 days ago', 6 * days],
  ['3 weeks ago', 3 * weeks],
])('%s', (expected_description, milliseconds_diff) => {
  const time = new Date(Date.now() - milliseconds_diff);
  const { container } = render(<RelativeTime time={time}/>);
  expect(container.textContent).toBe(expected_description);
});

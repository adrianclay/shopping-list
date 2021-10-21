import { Label, Segment } from "semantic-ui-react";

function AlphaBanner() {
  return <Segment color='blue' basic secondary>
    <Label color='black' style={{textTransform: 'uppercase', letterSpacing: '0.0625em'}} basic horizontal>Alpha</Label>
    This software is new
  </Segment>;
}

export default AlphaBanner;

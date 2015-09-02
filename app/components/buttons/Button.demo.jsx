import 'matstyle/less/main.less';
import React from 'react';
import Button from './Button';


React.render(
  <div>
    <h1>Text Buttons</h1>
    <Button variant="accent">Accent</Button>
    <Button variant="neutral">Secondary</Button>
    <Button variant="muted">Tertiary</Button>
    <Button variant="plain">Plain</Button>
    <h1>Text Buttons Large</h1>
    <Button
      size="large"
      variant="accent">
      Accent
    </Button>
    <Button
      size="large"
      variant="neutral">
      Secondary
    </Button>
    <Button
      size="large"
      variant="muted">
      Tertiary
    </Button>
    <Button
      size="large"
      variant="plain">
      Plain
    </Button>
    <h1>Disabled Text Button</h1>
    <Button
      variant="accent"
      disabled={true}>
      Disabled
    </Button>
    <h1>Disabled Text Button Large</h1>
    <Button
      size="large"
      variant="accent"
      disabled={true}>
      Disabled
    </Button>
  </div>
  , document.body);
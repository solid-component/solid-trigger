# solid-trigger

Solid Trigger Component

## Install

[![solid-trigger](https://nodei.co/npm/solid-trigger.png)](https://npmjs.org/package/solid-trigger)

## Usage

Include the default [styling](https://github.com/react-component/trigger/blob/master/assets/index.less#L4:L11) and then:

```js
import { render } from "solid-js/web";
import Trigger from "solid-trigger";

function HelloWorld() {
  return <div>Hello World!</div>;
}

function Button() {
  return <div>button</div>;
}

render(
  () => (
    <Trigger popup={<HelloWorld />}>
      <Button />
    </Trigger>
  ),
  document.getElementById("app")
);
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>open</td>
        <td>Boolean</td>
        <td></td>
        <td>whether popup is open</td>
      </tr>
      <tr>
        <td>defaultOpen</td>
        <td>Boolean</td>
        <td></td>
        <td>whether popup is open initially</td>
      </tr>
      <tr>
        <td>disabled</td>
        <td>Boolean</td>
        <td>false</td>
        <td>Whether to disable</td>
      </tr>
      <tr>
        <td>popup</td>
        <td>JSX.Element</td>
        <td></td>
        <td>popup content</td>
      </tr>
      <tr>
        <td>placement</td>
        <td>string</td>
        <td></td>
        <td>popup position</td>
      </tr>
      <tr>
        <td>showArrow</td>
        <td>Boolean</td>
        <td>false</td>
        <td>whether arrow is open</td>
      </tr>
      <tr>
        <td>offset</td>
        <td>number</td>
        <td>12</td>
        <td>offset of the popup</td>
      </tr>
      <tr>
        <td>class</td>
        <td>string</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>style</td>
        <td>JSX.CSSProperties</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>trigger</td>
        <td>enum</td>
        <td>hover</td>
        <td>How should the popup be triggered (to show)</td>
      </tr>
      <tr>
        <td>strategy</td>
        <td>enum</td>
        <td>fixed</td>
        <td></td>
      </tr>
      <tr>
        <td>mouseEnterDelay</td>
        <td>number</td>
        <td>100</td>
        <td>Delay in seconds, before popup is shown on mouse enter</td>
      </tr>
      <tr>
        <td>mouseLeaveDelay</td>
        <td>number</td>
        <td>100</td>
        <td>Delay in seconds, before tooltip is hidden on mouse leave</td>
      </tr>
      <tr>
        <td>onOpenChange</td>
        <td>Function</td>
        <td></td>
        <td>Callback executed when visibility of the popup  is changed</td>
      </tr>
      <tr>
        <td>background</td>
        <td>string</td>
        <td></td>
        <td>Background color of popup</td>
      </tr>
      <tr>
        <td>transition</td>
        <td>Object</td>
        <td></td>
        <td>Pop-up animation effect</td>
      </tr>
      <tr>
        <td>zIndex</td>
        <td>number</td>
        <td></td>
        <td>popup's zIndex</td>
      </tr>
    </tbody>
</table>

## License

solid-trigger is released under the MIT license.

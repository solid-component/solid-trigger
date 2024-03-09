import { Accessor, ChildrenReturn, createEffect } from "solid-js";
import { getWin } from "../utils";

const useWinClick = (props: {
  triggerDom: ChildrenReturn;
  popup: Accessor<HTMLDivElement | null>;
  visible: Accessor<boolean>;
  onVisible: (value: boolean) => void;
}) => {
  const inPopupOrChild = (ele: any) => {
    const triggerElement = props.triggerDom() as HTMLElement;
    const popupElement = props.popup() as HTMLElement;
    return (
      triggerElement?.contains(ele) ||
      ele === triggerElement ||
      popupElement?.contains(ele) ||
      ele === popupElement
    );
  };

  const genClickEvents = () => {
    let clickInside = false;

    // User may mouseDown inside and drag out of popup and mouse up
    // Record here to prevent close
    const onWindowMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      clickInside = inPopupOrChild(target);
    };
    const onWindowClick = (event: MouseEvent) => {
      // if(props.open()) return
      const target = event.target as HTMLElement;
      if (props.visible() && !clickInside && !inPopupOrChild(target)) {
        props.onVisible(false);
      }
    };
    return [onWindowMouseDown, onWindowClick];
  };

  createEffect(() => {
    if (props.visible() && props.popup()) {
      // Events
      const [_, onWinClick] = genClickEvents();
      const win = getWin(props.popup()!)!;
      win.addEventListener("click", onWinClick, true);
    }
  });
  return null;
};

export default useWinClick;

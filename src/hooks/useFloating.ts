import {
  Accessor,
  ChildrenReturn,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
import {
  computePosition,
  Placement,
  Strategy,
  Middleware,
  autoUpdate,
  flip,
} from "@floating-ui/dom";

export type UseFloatingProps = {
  visible: Accessor<boolean>;
  triggerDom: ChildrenReturn;
  popup: Accessor<HTMLDivElement | null>;
  middleware: () => Array<Middleware>;
  placement?: Placement;
  strategy: Strategy;
};

const useFloating = (props: UseFloatingProps) => {
  const [placement, setPlacement] = createSignal(props.placement);
  const [popupStates, setPopupStates] = createSignal<{
    x?: number;
    y?: number;
  }>({});
  const [arrowStates, setArrowStates] = createSignal<{
    x?: number;
    y?: number;
  }>({});

  const middleware = () => {
    const middle: Middleware[] = [flip()];
    const otherMiddleware = props.middleware();
    if (otherMiddleware) {
      return middle.concat(otherMiddleware);
    }
    return middle;
  };

  const update = async () => {
    const triggerEle = props.triggerDom();
    const popupEle = props.popup() as unknown as HTMLElement;
    if (!(triggerEle instanceof HTMLElement) || !popupEle) return;
    const data = await computePosition(triggerEle, popupEle, {
      placement: props.placement,
      middleware: middleware(),
      strategy: props.strategy,
    });
    setPlacement(data.placement);
    setPopupStates({
      x: data.x,
      y: data.y,
    });
    if (data.middlewareData.arrow) {
      setArrowStates({
        x: data.middlewareData.arrow.x,
        y: data.middlewareData.arrow.y,
      });
    }
  };

  let cleanup: (() => void) | undefined;
  createEffect(() => {
    const triggerEle = props.triggerDom();
    const popupEle = props.popup() as unknown as HTMLElement;
    if (!(triggerEle instanceof HTMLElement) || !popupEle || !props.visible())
      return;
    let cleanup = autoUpdate(triggerEle, popupEle, () => {
      update();
    });
    onCleanup(() => {
      cleanup && cleanup();
    });
  });

  onCleanup(() => {
    cleanup && cleanup();
  });

  const contentStyle = (): JSX.CSSProperties => {
    return {
      position: props.strategy,
      top: `${popupStates().y || 0}px`,
      left: `${popupStates().x || 0}px`,
    };
  };

  const arrowStyle = (): JSX.CSSProperties => {
    return {
      position: "absolute",
      "--arrow-y": `${arrowStates().y || 0}px`,
      "--arrow-x": `${arrowStates().x || 0}px`,
    };
  };

  return { placement, contentStyle, arrowStyle };
};

export default useFloating;

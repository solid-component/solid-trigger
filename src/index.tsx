import {
  ParentProps,
  Show,
  children,
  createEffect,
  createSignal,
  mergeProps,
  onCleanup,
} from "solid-js";
import { useTrigger } from "./hooks/useTrigger";
import { arrow, Middleware, Strategy, offset } from "@floating-ui/dom";
import useFloating from "./hooks/useFloating";
import { Transition } from "solid-transition-group";
import { TriggerProps } from "./types";
import { SArrow, SPopover } from "./style";
import useWinClick from "./hooks/useWinClick";
import classNames from "classnames";
import { Portal } from "solid-js/web";

export type {
  TriggerProps
}

const Trigger = (p: ParentProps<TriggerProps>) => {
  const props = mergeProps(
    {
      strategy: "fixed" as Strategy,
      mouseEnterDelay: 100,
      mouseLeaveDelay: 100,
      trigger: "hover",
      offset: 12,
    },
    p
  );
  const triggerDom = children(() => props.children);
  const [popup, setPopup] = createSignal(null as HTMLDivElement | null);
  const [arrowRef, setArrowRef] = createSignal(null as HTMLDivElement | null);
  const [internalVisible, setVisible] = createSignal(props.defaultOpen);

  const visible = () => {
    if (props.disabled) return false;
    return ("open" in props ? props.open : internalVisible()) as boolean;
  };
  const { onClose, onOpen, onCancelClose, onDelayClose, onDelayOpen } =
    useTrigger({
      mouseEnterDelay: props.mouseEnterDelay,
      mouseLeaveDelay: props.mouseLeaveDelay,
      triggerVisible(visible) {
        if (props.disabled) return;
        if (props.onOpenChange) {
          props.onOpenChange(visible);
        }
        if ("open" in props) return;
        setVisible(visible);
      },
    });
  const middleware = () => {
    const middle: Middleware[] = [offset(props.offset)];
    if (arrowRef() && props.showArrow) {
      middle.push(
        arrow({
          element: arrowRef()!,
        })
      );
    }
    return middle;
  };

  const { placement, contentStyle, arrowStyle } = useFloating({
    visible,
    triggerDom,
    popup,
    placement: props.placement,
    strategy: props.strategy,
    middleware,
  });
  useWinClick({
    triggerDom,
    popup,
    visible,
    onVisible: setVisible,
  });

  const onMouseenter = () => {
    if (props.trigger !== "hover") return;
    onDelayOpen();
  };

  const onMouseleave = () => {
    if (props.trigger !== "hover") return;
    onDelayClose();
  };

  const onFocus = () => {
    if (visible() || props.trigger !== "focus") return;
    onOpen();
  };

  const onClick = () => {
    if (props.trigger !== "click") return;
    if (visible()) {
      onClose();
      return;
    }
    onOpen();
  };

  const events = {
    blur: onClose,
    click: onClick,
    focus: onFocus,
    mouseenter: onMouseenter,
    mouseleave: onMouseleave,
  };

  const setEvents = <T extends (e: Event) => void>(
    el: HTMLElement | null | undefined,
    events: Record<string, T>,
    type: "addEventListener" | "removeEventListener"
  ) => {
    if (el) {
      Object.entries(events).forEach(([name, handler]) => {
        el[type](name, handler);
      });
    }
  };

  createEffect(() => {
    const triggerElement = triggerDom();
    if (triggerElement instanceof HTMLElement) {
      setEvents(triggerElement, events, "addEventListener");
    }
    onCleanup(() => {
      if (triggerElement instanceof HTMLElement) {
        setEvents(triggerElement, events, "removeEventListener");
      }
    });
  });

  onCleanup(() => {
    const triggerElement = triggerDom();
    if (triggerElement instanceof HTMLElement) {
      setEvents(triggerElement, events, "removeEventListener");
    }
  });

  const Content = (
    <SPopover
      ref={setPopup}
      class={classNames(props.class, "popover", {
        [`popover-${placement()}`]: placement(),
      })}
      data-popper-placement={placement()?.split("-")?.[0]}
      style={{ "z-index": props.zIndex, ...props.style, ...contentStyle() }}
      onMouseEnter={onCancelClose}
      onMouseLeave={onMouseleave}
    >
      {props.popup}
      <Show when={props.showArrow}>
        <SArrow
          ref={setArrowRef}
          class="popover-arrow"
          style={{ ...arrowStyle() }}
        />
      </Show>
    </SPopover>
  );

  return (
    <>
      {triggerDom()}
      <Portal>
        <Show
          when={props.transition}
          fallback={<Show when={visible()}>{Content}</Show>}
        >
          <Transition {...props.transition}>
            <Show when={visible()}>{Content}</Show>
          </Transition>
        </Show>
      </Portal>
    </>
  );
};

export default Trigger;

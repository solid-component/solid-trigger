import { JSX } from "solid-js";
import { Placement, Strategy } from "@floating-ui/dom";
import { TransitionProps } from "solid-transition-group";

export type TriggerAction = "hover" | 'focus' | 'click'

export type TriggerProps = {
  open?: boolean;
  defaultOpen?: boolean;
  disabled?: boolean
  popup?: JSX.Element;
  placement?: Placement;
  showArrow?: boolean;
  /** default 12px */
  offset?: number
  class?: string
  style?: JSX.CSSProperties
  trigger?: TriggerAction
  strategy?: Strategy
  /** default 100ms */
  mouseEnterDelay?: number,
  /** default 100ms */
  mouseLeaveDelay?: number
  onOpenChange?: (visible: boolean) => void
  background?: string;
  transition?: TransitionProps
  children?: JSX.Element
  zIndex?: number
};

import { styled } from "solid-styled-components";

export const SPopover = styled("div")(() => ({
  background: "var(--bg-color)",
  borderRadius: "2px",
  "&.popover[data-popper-placement^=top]": {
    ".popover-arrow": {
      left: "var(--arrow-x)",
      bottom: "-5px",
    },
  },
  "&.popover[data-popper-placement^=bottom]": {
    ".popover-arrow": {
      left: "var(--arrow-x)",
      top: "-5px",
    },
  },
  "&.popover[data-popper-placement^=right]": {
    ".popover-arrow": {
      left: "-5px",
      top: "var(--arrow-y)",
    },
  },
  "&.popover[data-popper-placement^=left]": {
    ".popover-arrow": {
      right: "-5px",
      top: "var(--arrow-y)",
    },
  },
}));

export const SArrow = styled("div")(() => ({
  width: "10px",
  height: "10px",
  "&::before": {
    position: "absolute",
    width: "10px",
    height: "10px",
    zIndex: -1,
    content: '""',
    transform: "rotate(45deg)",
    background: "var(--bg-color)",
    boxSizing: "border-box",
  },
}));

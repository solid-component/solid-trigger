export const useTrigger = (props: {
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  triggerVisible: (visible: boolean) => void;
}) => {
  let timeoutId: number | undefined;
  let closeTimeoutId: number | undefined;
  const clearTimer = () => timeoutId && clearTimeout(timeoutId);
  const onCancelClose = () => closeTimeoutId && clearTimeout(closeTimeoutId);

  const onDelayedOpen = () => {
    onCancelClose();
    timeoutId = setTimeout(() => {
      props.triggerVisible(true);
    }, props.mouseEnterDelay);
  };

  const onOpen = () => {
    clearTimer();
    onCancelClose();
    props.triggerVisible(true);
  };

  const onDelayOpen = () => {
    onDelayedOpen();
  };

  const onDelayClose = () => {
    clearTimer();
    closeTimeoutId = setTimeout(() => {
      props.triggerVisible(false);
    }, props.mouseLeaveDelay);
  };

  const onClose = () => {
    clearTimer();
    props.triggerVisible(false);
  };

  return {
    onClose,
    onOpen,
    onDelayOpen,
    onDelayClose,
    onCancelClose,
  };
};

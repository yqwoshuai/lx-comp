import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "lx-comp-in-top"
  | "lx-comp-in-left"
  | "lx-comp-in-right"
  | "lx-comp-in-bottom";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: Boolean
}

const Transition: React.FC<TransitionProps> = props => {
  const { classNames, animation, children, wrapper, ...restProps } = props
  return (
    <CSSTransition
      {...restProps}
      classNames={classNames ? classNames : animation}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}

export default Transition
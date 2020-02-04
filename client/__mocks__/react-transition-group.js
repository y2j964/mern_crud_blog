import React from 'react';

const RenderChildren = jest.fn(({ children }) => children);
const FakeCSSTransition = jest.fn(props =>
  props.in ? <RenderChildren>{props.children}</RenderChildren> : null
);

module.exports = {
  TransitionGroup: RenderChildren,
  CSSTransition: FakeCSSTransition,
  Transition: RenderChildren,
};

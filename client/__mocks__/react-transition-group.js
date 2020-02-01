const RenderChildren = jest.fn(({ children }) => children);

module.exports = {
    TransitionGroup: RenderChildren,
    CSSTransition: RenderChildren,
    Transition: RenderChildren,
}
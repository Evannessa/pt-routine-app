// ? https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
// The condition part is quite self-explanatory.
// Then the tricky part is the wrapper.
// It receives a function that will be called in the ConditionalWrapper component itself when the condition is true.
// There it will receive the implicit children as argument. And will return what it receives wrapped in whatever we want; in this case, a link.
export const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

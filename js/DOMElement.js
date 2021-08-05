export const takeDOMElements = (elements) => {
  const arr = [];
  elements.forEach((elem) => {
    const obj = {};
    const el = elem.many
      ? document.querySelectorAll(elem.selector)
      : document.querySelector(elem.selector);

    let textEl = elem.errorText ? document.querySelector(elem.errorText) : null;
    obj[elem.name] = { input: el, errorText: textEl };
    arr.push(obj[elem.name]);
  });
  return arr;
};

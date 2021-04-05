export default (d: Document, id: string): void => {
  const element = d.getElementById(id);

  if (element && element.parentNode) {
    element.parentNode.removeChild(element);
  }
};

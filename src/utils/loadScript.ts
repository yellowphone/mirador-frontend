export default (
  d: Document,
  s: string,
  id: string,
  jsSrc: string,
  cb: ((this: GlobalEventHandlers, ev: Event) => never) | null,
  onError: OnErrorEventHandler
): void => {
  const element = d.getElementsByTagName(s)[0] as HTMLScriptElement;
  const fjs = element;
  let js = element;
  js = d.createElement(s) as HTMLScriptElement;
  js.id = id;
  js.src = jsSrc;
  if (fjs && fjs.parentNode) {
    fjs.parentNode.insertBefore(js, fjs);
  } else {
    d.head.appendChild(js);
  }
  js.onerror = onError;
  js.onload = cb;
};

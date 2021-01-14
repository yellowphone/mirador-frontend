export default (d: Document, id: string) => {
    const element = d.getElementById(id)
  
    if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  }
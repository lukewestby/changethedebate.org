export type Callback = (event: Event) => void

export default class BaseEventTarget {
  private listeners: { [key: string]: Array<Callback> }

  public constructor() {
    this.listeners = Object.create(null)
  }

  public addEventListener(type: string, callback: Callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)  
  }

  public removeEventListener(type: string, callback: Callback) {
    if (!(type in this.listeners)) {
      return
    }
    var stack = this.listeners[type]
    for (var i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback){
        stack.splice(i, 1)
        return
      }
    }
  }

  public dispatchEvent(event: Event): boolean {
    if (!(event.type in this.listeners)) {
      return true
    }
    var stack = this.listeners[event.type].slice()
  
    for (var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
    }
    return !event.defaultPrevented
  }
}
import * as React from 'react'
import Styles from './ActionNetwork.module.css'

export type Props = {
  actionId: string,
}

const cache: { [key: string]: HTMLDivElement } = Object.create(null)

const ActionNetwork = (props: Props) => {
  const container: React.MutableRefObject<null | HTMLDivElement> = React.useRef(null)
  
  React.useEffect(() => {
    if (!container.current) return
    let inner: HTMLDivElement
    if (cache[props.actionId]) {
      inner = cache[props.actionId]
      container.current.appendChild(inner)
    } else {
      inner = document.createElement('div')
      inner.innerHTML = `
        <div id="can-event-area-${props.actionId}" style="width: 100%;"></div>
      `
      const script = document.createElement('script')
      script.src = `https://actionnetwork.org/widgets/v3/event/${props.actionId}?format=js&source=widget`
      inner.appendChild(script)

      const styles = document.createElement('link')
      styles.href = 'https://actionnetwork.org/css/style-embed-whitelabel-v3.css'
      styles.rel = 'stylesheet'
      inner.appendChild(styles)

      container.current.appendChild(inner)
    }

    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      target.value === '' ?
        target.parentElement!.classList.remove('has-value') :
        target.parentElement!.classList.add('has-value')
      target.classList.contains('error_input') ?
        target.parentElement!.classList.add('has-error') :
        target.parentElement!.classList.remove('has-error')
    }

    const onBlur = (event: Event) => {
      const target = event.target as HTMLInputElement
      target.classList.contains('error_input') ?
        target.parentElement!.classList.add('has-error') :
        target.parentElement!.classList.remove('has-error')
    }

    inner.addEventListener('input', onInput)
    inner.addEventListener('focusout', onBlur)

    return () => {
      inner.removeEventListener('input', onInput)
      inner.removeEventListener('focusout', onBlur)
      cache[props.actionId] = inner
      container.current && container.current.removeChild(inner)
    }
  }, [props.actionId])

  return (
    <div className={Styles.container} ref={container}>
    </div>
  )
}

export default ActionNetwork
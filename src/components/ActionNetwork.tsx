import * as React from 'react'

export type Props = {
  actionId: string,
}

const ActionNetwork = (props: Props) => {
  const container: React.MutableRefObject<null | HTMLDivElement> = React.useRef(null)
  
  React.useEffect(() => {
    if (!container.current) return
    container.current.innerHTML = `
      <link href="https://actionnetwork.org/css/style-embed-v3.css" rel="stylesheet" type="text/css" />
      <div id="can-form-area-${props.actionId}" style="width: 100%;"></div>
    `
    const script = document.createElement('script')
    script.src = `https://actionnetwork.org/widgets/v3/form/${props.actionId}?format=js&source=widget`
    container.current.appendChild(script)
    return () => {
      if (!container.current) return
      container.current.innerHTML = ''
    }
  }, [props.actionId])

  return (
    <div ref={container}></div>
  )
}

export default ActionNetwork
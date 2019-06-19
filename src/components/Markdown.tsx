import * as React from 'react'
import * as Preview from '../contexts/PreviewService'
import Styles from './Markdown.module.css'

const process = async (input: string): Promise<string> => {
  const { default: remark } = await import('remark')
  const { default: remarkHtml } = await import('remark-html')
  return new Promise((resolve, reject) => {
    remark()
      .use(remarkHtml)
      .process(input, (error, file) => {
        if (error) reject(error)
        else if (file) resolve(file.toString())
      })
  })
}

type Props = {
  input: string,
}

const PreviewMarkdown = (props: Props) => {
  const [result, setResult] = React.useState<string | null>(null)
  React.useEffect(() => {
    let mounted = true
    process(props.input).then(s => {
      if (mounted) setResult(s)
    })
    return () => { mounted = false }
  }, [props.input])
  return !result ?
    <div /> :
    <div className={Styles.markdown} dangerouslySetInnerHTML={{ __html: result }} />
}

const LiveMarkdown = (props: Props) => {
  return <div className={Styles.markdown} dangerouslySetInnerHTML={{ __html: props.input }} />
}

const Markdown = (props: Props) => {
  const isPreview = Preview.usePreview()
  return isPreview ?
    <PreviewMarkdown {...props} /> :
    <LiveMarkdown {...props} />
}

export default Markdown
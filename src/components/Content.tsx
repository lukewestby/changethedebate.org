import React from 'react'

type Props = {
  content: React.ReactNode,
  className: string,
}

export const HTMLContent = ({ content, className }: Props) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content as string }} />
)

const Content = ({ content, className }: Props) => (
  <div className={className}>{content}</div>
)

export default Content

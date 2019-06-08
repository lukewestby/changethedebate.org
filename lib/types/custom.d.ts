declare module '*.svg' {
  const path: string
  export default path
}

declare module '*.module.css' {
  const styles: { [key: string]: string }
  export default styles
}
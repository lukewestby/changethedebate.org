declare module '@mapbox/mapbox-gl-language' {
  import { Control } from 'mapbox-gl'
  export type Options = {
    defaultLanguage?: string,
  }
  export default class MapboxLanguage extends Control {
    constructor(options?: Options)
  }
}

declare module 'remark' {
  export class Plugin {}

  class Parsed {
    toString(): string
  }

  class Remark {
    use(plugin: Plugin): Remark
    processSync(input: string): Parsed
    process(input: string, cb: (error: Error | null, parsed: Parsed | null) => void): void
  }

  const main: () => Remark
  export default main
}

declare module 'remark-html' {
  import { Plugin } from 'remark'
  const main: Plugin
  export default main
}

declare module 'remark-preset-gfm' {
  import { Plugin } from 'remark'
  const main: Plugin
  export default main
}

declare module '*.svg' {
  const path: string
  export default path
}

declare module '*.module.css' {
  const styles: { [key: string]: string }
  export default styles
}

type ScrollDirection =
  | 'block'
  | 'inline'
  | 'horizontal'
  | 'vertical'

interface ScrollTimelineOptions {
  scrollSource?: Element | null,
  orientation?: ScrollDirection,
  timeRange?: number | 'auto',
  startScrollOffset?: string,
  endScrollOffset?: string,
  fill?: FillMode
}

interface ScrollTimeline extends AnimationTimeline {
  readonly scrollSource: Element
  readonly orientation: ScrollDirection
  readonly startScrollOffset: string
  readonly endScrollOffset: string
  readonly timeRange: number | 'auto'
  readonly fill: FillMode
}

interface ScrollTimelineConstructor {
  new(options?: ScrollTimelineOptions): ScrollTimeline
}

declare const ScrollTimeline: ScrollTimelineConstructor

interface CSS {
  animationWorklet: Worklet
}

interface WorkletAnimation extends Animation {}
interface WorkletAnimationConstructor {
  new(
    name: string,
    effect: KeyframeEffect,
    timeline: AnimationTimeline,
    options?: any
  ): WorkletAnimation
}
declare const WorkletAnimation: WorkletAnimationConstructor
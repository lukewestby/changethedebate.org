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
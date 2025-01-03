import {
  AnimationPlaybackControls,
  AnimationSequence,
  DOMKeyframesDefinition,
  DynamicAnimationOptions,
  ElementOrSelector,
  MotionValue,
  ObjectTarget,
  SequenceOptions,
  ValueAnimationTransition,
} from 'framer-motion'

class GenericKeyframesTarget<T> {}

export type FramerMotionAnimate = {
  (sequence: AnimationSequence, options?: SequenceOptions | undefined): AnimationPlaybackControls
  (value: string | MotionValue<string>, keyframes: string | GenericKeyframesTarget<string>, options?: ValueAnimationTransition<string> | undefined): AnimationPlaybackControls
  (value: number | MotionValue<number>, keyframes: number | GenericKeyframesTarget<number>, options?: ValueAnimationTransition<number> | undefined): AnimationPlaybackControls
  <V>(value: MotionValue<V> | V, keyframes: GenericKeyframesTarget<V> | V, options?: ValueAnimationTransition<V> | undefined): AnimationPlaybackControls
  (element: ElementOrSelector, keyframes: DOMKeyframesDefinition, options?: DynamicAnimationOptions | undefined): AnimationPlaybackControls
  <O extends NonNullable<unknown>>(object: O[] | O, keyframes: ObjectTarget<O>, options?: DynamicAnimationOptions | undefined): AnimationPlaybackControls
}

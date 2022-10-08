import {animate, AnimationTriggerMetadata, group, query, style, transition, trigger} from '@angular/animations';
import {AnimationDefinition} from "@core/models";

const SlideAnimation = [
  transition('* <=> *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    group([
      query(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateX(0%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
      ], {optional: true}),
    ])
  ])
]

const FadeAnimation = [
  transition('* => *', [
    query(':enter', [
      style({opacity: 0})
    ], {optional: true}),
    query(':leave', [
      style({opacity: 1}), animate('0.3s', style({opacity: 0}))
    ], {optional: true}),
    query(':enter', [
      style({opacity: 0}), animate('0.3s', style({opacity: 1}))
    ], {optional: true})
  ])
]

const FadeAnimation2 = [
  transition('*<=>*', [
    style({opacity: 0}),
    animate('0.6s', style({opacity: 1}))
  ]),
]

const FadeAnimation3 = [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        height: '100%',
        'z-index': 10
      })
    ], {optional: true}),

    query(':leave', [
      style({opacity: 1}),
      animate('0.5s', style({opacity: 0}))
    ], {optional: true}),

    query(':enter',
      [
        style({opacity: 0}),
        animate('0.5s', style({opacity: 1}))
      ], {optional: true})
  ])
]

const animations: AnimationDefinition = {
  none: [],
  fade: FadeAnimation2,
  slide: SlideAnimation
}

export function RouteAnimation(name: string): AnimationTriggerMetadata {
  return trigger('routeAnimation', animations[name] || animations['none']);
}

import {animate, AnimationTransitionMetadata, group, query, style, transition, trigger} from '@angular/animations';

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
      ], {optional: true}
    ),
    query(':enter', [
        style({opacity: 0}), animate('0.3s', style({opacity: 1}))
      ], {optional: true}
    )
  ])
]

const animationMetaData: { [key: string]: AnimationTransitionMetadata[] } = {
  none: [],
  fade: FadeAnimation,
  slide: SlideAnimation
}

export function RouteAnimation(name: 'fade' | 'slide' | 'none') {
  return trigger('routeAnimation', animationMetaData[name]);
}

import { Channel } from './models';

export type ChannelAction =
  | { type: 'TOGGLE' }
  | { type: 'POWER_UPDATE'; watts: number }
  | { type: 'EXTEND' }
  | { type: 'TIMER_END' };

export function transition(channel: Channel, action: ChannelAction): Channel {
  const next: Channel = { ...channel };
  switch (action.type) {
    case 'TOGGLE':
      if (next.state === 'OFF' || next.state === 'CUT') {
        next.state = 'ON_ACTIVE';
      } else {
        next.state = 'OFF';
      }
      return next;
    case 'POWER_UPDATE':
      next.watts = action.watts;
      if (
        next.state === 'ON_ACTIVE' &&
        !next.alwaysOn &&
        action.watts < next.idleThresholdW
      ) {
        next.state = 'IDLE_GRACE';
      }
      return next;
    case 'EXTEND':
      if (next.state === 'IDLE_GRACE') {
        next.state = 'ON_ACTIVE';
      }
      return next;
    case 'TIMER_END':
      if (next.state === 'IDLE_GRACE' && !next.alwaysOn) {
        next.state = 'CUT';
      }
      return next;
    default:
      return next;
  }
}

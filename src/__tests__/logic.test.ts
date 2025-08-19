import { transition } from '../lib/logic';
import { Channel } from '../lib/models';

describe('channel state machine', () => {
  const base: Channel = {
    id: '1',
    name: 'demo',
    watts: 5,
    state: 'OFF',
    idleThresholdW: 1,
    graceMinutes: 10,
    alwaysOn: false
  };

  it('toggles OFF -> ON_ACTIVE', () => {
    const next = transition(base, { type: 'TOGGLE' });
    expect(next.state).toBe('ON_ACTIVE');
  });

  it('goes to IDLE_GRACE on low watts', () => {
    const on = { ...base, state: 'ON_ACTIVE' };
    const next = transition(on, { type: 'POWER_UPDATE', watts: 0 });
    expect(next.state).toBe('IDLE_GRACE');
  });

  it('cuts after timer end', () => {
    const grace = { ...base, state: 'IDLE_GRACE' };
    const next = transition(grace, { type: 'TIMER_END' });
    expect(next.state).toBe('CUT');
  });

  it('extend returns to ON_ACTIVE', () => {
    const grace = { ...base, state: 'IDLE_GRACE' };
    const next = transition(grace, { type: 'EXTEND' });
    expect(next.state).toBe('ON_ACTIVE');
  });
});

import { BleGateway, Board, Channel } from '../models';
import { transition } from '../logic';

function createDemoBoard(): Board {
  const channels: Channel[] = [
    { id: '1', name: 'Charger', watts: 0.8, state: 'ON_ACTIVE', idleThresholdW: 1.0, graceMinutes: 10, alwaysOn: false },
    { id: '2', name: 'Desk Lamp', watts: 5, state: 'ON_ACTIVE', idleThresholdW: 1.0, graceMinutes: 10, alwaysOn: false },
    { id: '3', name: 'TV Box', watts: 0, state: 'OFF', idleThresholdW: 1.0, graceMinutes: 10, alwaysOn: false },
    { id: '4', name: 'Air Purifier', watts: 28, state: 'ON_ACTIVE', idleThresholdW: 1.0, graceMinutes: 10, alwaysOn: false },
    { id: '5', name: 'Spare Socket', watts: 0, state: 'OFF', idleThresholdW: 1.0, graceMinutes: 10, alwaysOn: false },
    { id: '6', name: 'Heater', watts: 650, state: 'ON_ACTIVE', idleThresholdW: 5, graceMinutes: 10, alwaysOn: false }
  ];
  return { id: 'board-1', name: 'Bedroom Board', finish: 'Obsidian', channels };
}

class BleMock implements BleGateway {
  private boards: Board[] = [createDemoBoard()];

  async scanBoards(): Promise<Board[]> {
    return this.boards;
  }

  async connect(_: string): Promise<void> {
    return;
  }

  async readChannels(boardId: string): Promise<Channel[]> {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return [];
    board.channels = board.channels.map(ch => {
      const delta = (Math.random() - 0.5) * 0.5;
      const watts = Math.max(0, ch.watts + delta);
      const updated = transition(ch, { type: 'POWER_UPDATE', watts });
      return updated;
    });
    return board.channels;
  }

  async writeToggle(boardId: string, channelId: string): Promise<void> {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
    board.channels = board.channels.map(ch =>
      ch.id === channelId ? transition(ch, { type: 'TOGGLE' }) : ch
    );
  }

  async setParams(
    boardId: string,
    channelId: string,
    params: { idleThresholdW?: number; graceMinutes?: number }
  ): Promise<void> {
    const board = this.boards.find(b => b.id === boardId);
    if (!board) return;
    board.channels = board.channels.map(ch => {
      if (ch.id !== channelId) return ch;
      return { ...ch, ...params };
    });
  }
}

export const bleMock = new BleMock();

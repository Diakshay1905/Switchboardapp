export type ChannelState = 'OFF' | 'ON_ACTIVE' | 'IDLE_GRACE' | 'CUT';

export interface Channel {
  id: string;
  name: string;
  watts: number;
  state: ChannelState;
  idleThresholdW: number;
  graceMinutes: number;
  alwaysOn: boolean;
}

export interface Board {
  id: string;
  name: string;
  finish: 'Obsidian' | 'Moonlight' | 'Sand' | 'Arctic';
  channels: Channel[];
}

export interface EventLog {
  channelId: string;
  from: ChannelState;
  to: ChannelState;
  at: number;
}

export interface BleGateway {
  scanBoards(): Promise<Board[]>;
  connect(boardId: string): Promise<void>;
  readChannels(boardId: string): Promise<Channel[]>;
  writeToggle(boardId: string, channelId: string): Promise<void>;
  setParams(
    boardId: string,
    channelId: string,
    params: { idleThresholdW?: number; graceMinutes?: number }
  ): Promise<void>;
}

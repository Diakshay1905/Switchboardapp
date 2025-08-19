import { BleManager } from 'react-native-ble-plx';
import { BleGateway, Board, Channel } from '../models';

// This is a very light wrapper around react-native-ble-plx. In Expo Web it does nothing.
export class BleService implements BleGateway {
  private manager = new BleManager();

  async scanBoards(): Promise<Board[]> {
    // Implementation would scan for BLE devices advertising as boards.
    return [];
  }

  async connect(_boardId: string): Promise<void> {
    return;
  }

  async readChannels(_boardId: string): Promise<Channel[]> {
    return [];
  }

  async writeToggle(_boardId: string, _channelId: string): Promise<void> {
    return;
  }

  async setParams(
    _boardId: string,
    _channelId: string,
    _params: { idleThresholdW?: number; graceMinutes?: number }
  ): Promise<void> {
    return;
  }
}

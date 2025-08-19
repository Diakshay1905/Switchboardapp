import create from 'zustand';
import { Board } from './models';
import { bleMock } from './ble/ble.mock';
import { transition } from './logic';

interface Store {
  boards: Board[];
  hydrateFromBle: () => Promise<void>;
  toggleChannel: (boardId: string, channelId: string) => Promise<void>;
  extendGrace: (boardId: string, channelId: string) => void;
  setParams: (
    boardId: string,
    channelId: string,
    params: { idleThresholdW?: number; graceMinutes?: number }
  ) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  boards: [],
  hydrateFromBle: async () => {
    const boards = await bleMock.scanBoards();
    set({ boards });
  },
  toggleChannel: async (boardId, channelId) => {
    await bleMock.writeToggle(boardId, channelId);
    set({
      boards: get().boards.map(b =>
        b.id === boardId
          ? {
              ...b,
              channels: b.channels.map(ch =>
                ch.id === channelId ? transition(ch, { type: 'TOGGLE' }) : ch
              )
            }
          : b
      )
    });
  },
  extendGrace: (boardId, channelId) => {
    set({
      boards: get().boards.map(b =>
        b.id === boardId
          ? {
              ...b,
              channels: b.channels.map(ch =>
                ch.id === channelId ? transition(ch, { type: 'EXTEND' }) : ch
              )
            }
          : b
      )
    });
  },
  setParams: async (boardId, channelId, params) => {
    await bleMock.setParams(boardId, channelId, params);
    set({
      boards: get().boards.map(b =>
        b.id === boardId
          ? {
              ...b,
              channels: b.channels.map(ch =>
                ch.id === channelId ? { ...ch, ...params } : ch
              )
            }
          : b
      )
    });
  }
}));

async function poll() {
  const boards = useStore.getState().boards;
  for (const b of boards) {
    const channels = await bleMock.readChannels(b.id);
    useStore.setState({
      boards: useStore.getState().boards.map(board =>
        board.id === b.id ? { ...board, channels } : board
      )
    });
  }
}

setInterval(poll, 2000);

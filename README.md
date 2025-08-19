# Switchboardapp

A demo Expo application for a per-switch auto-OFF smart switchboard. The app is local-first and ships with a deterministic BLE mock for offline development.

## Getting started

```bash
npm install
npm test
# expo start
```

The default BLE gateway uses a mock provider (`ble.mock.ts`) that simulates a single board with six channels. Replace it with `BleService` in `lib/state.ts` if you have hardware.

## Project structure

- `src/theme` – design tokens and skeuomorphic helpers
- `src/lib` – data models, BLE layer, Zustand store and state logic
- `src/components` – reusable UI pieces like the rocker switch
- `src/screens` – navigation screens
- `src/assets` – lottie animations

## Tests

Basic unit tests cover the channel state machine in `logic.ts`.

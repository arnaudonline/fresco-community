interface IToolbarButton {
  title: string;
  ui: { type: string };
  property: string;
}

interface IInitializeOptions {
  title: string;
  toolbarButtons: IToolbarButton[];
}

type AppearanceValue =
  | string
  | number
  | boolean
  | Record<string, AppearanceValue>;

type Participant = {
  name: string;
  id: string;
};

type ProtectedStorageItem = {
  ownerId: string;
  id: string;
  value: ProtectedStorageValueType;
};

interface IFrescoSdk {
  onReady(callback: () => void): void;
  onStateChanged(callback: () => void): void;
  subscribeToGlobalEvent(
    eventName: string,
    handler: (event: any) => void
  ): () => void;
  element: {
    state: any;
    id: string;
    name: string;
    appearance: Record<string, AppearanceValue>;
    storage: {
      [tableName: string]: ProtectedStorageItem[];
    };
  };
  setState(state: any): void;
  initialize(defaultState: any, options: IInitializeOptions): void;
  send(action: { type: string; payload: any }): void;
  localParticipant: Participant;
  remoteParticipants: Participant[];
  storage: {
    add: (tableName: string, value: AppearanceValue) => void;
    remove: (tableName: string, id: string) => void;
    clear: (tableName: string) => void;
  };
}

declare var fresco: IFrescoSdk;

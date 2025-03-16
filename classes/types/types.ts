interface InteractionDetails {
  type: string;
  direction: string;
  method: "collision" | "special";
}

interface NpcData {
  id: number;
  dialog: {
    collision: { message: string };
    special: { message: string };
  };
}

interface Dialogues {
  collision?: string[];
  special?: string[];
}

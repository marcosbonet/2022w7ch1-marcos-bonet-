export type ProtoPlayer = {
    player: string;
    position: string;
    age: number;
    club: string;
    marketPrice: string;
};
export type Players = {
    players: PlayerTypes[];
};

export type PlayerTypes = {
    player: string;
    position: string;
    age: number;
    club: string;
    id: number;
    marketPrice: string;
};

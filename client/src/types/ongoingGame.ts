import IGameSettings from "./gameSettings";

export default interface IOngoingGame {
	words: string;
	typed: string;
	started: number; // Timestamp
	stats: {
		misses:number;
		strokes:number;
		current_wpm: number;
		accuracy: number;
	}
	settings: IGameSettings;
}
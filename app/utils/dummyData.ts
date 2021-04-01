import { Player } from '../entities/Player';
import { GameSession } from '../entities/GameSession';
import { GameMove } from '../entities/GameMove';

let gameSessions: GameSession[] = [];

let playersArray: Player[] = [];

let gameMovesArray: GameMove[] = [];

export {
    gameSessions,
    playersArray,
    gameMovesArray,
};
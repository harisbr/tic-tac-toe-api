import { GameSession } from '../entities/GameSession';
import { Player } from '../entities/Player';
import { GameMove } from '../entities/GameMove';
import { gameSessions, playersArray, gameMovesArray } from '../utils/dummyData';
import { RulesService } from './RulesService';

export class GameService {
    constructor(public rulesService: RulesService) {
        this.rulesService = new RulesService();
    }

    createGameSession(data: GameSession) {
        gameSessions.push(data);
        return data;
    }

    addPlayer(data: Player) {
        const gameSession = gameSessions.find((game) => game.id === data.gameSessionId);
        if (gameSession) {
            const playerInGameSession = playersArray.filter(
                (elem) => elem.gameSessionId === data.gameSessionId,
            );
    
            if (gameSession.gameType === 'singleplayer') {
                if (playerInGameSession && playerInGameSession.length > 0) {
                    return { message: 'There is already player in Singleplayer Game!' }
                } else {
                    playersArray.push(data);
                }
            }
    
            if (gameSession.gameType === 'multiplayer') {
                if (playerInGameSession) {
                    if (playerInGameSession.length < 2) {
                        playersArray.push(data);
                    } else {
                        return { message: 'There are already two players in Multiplayer Game!' }
                    }
                } else {
                    playersArray.push(data);
                }
            }
            return data;
        }
        return { message: 'Invalid game session ID provided' };
    }

    makeMove(data: GameMove) {
        const totalMoves = gameMovesArray.length;
        if (totalMoves !== 0) {
            const currentMovesWithProvidedSign = gameMovesArray.filter(
                (elem) => {
                    return elem.playerId === data.playerId
                }
            );
            const otherPlayerMoves = totalMoves - currentMovesWithProvidedSign.length;
            if (currentMovesWithProvidedSign.length > otherPlayerMoves) {
                return { message: 'Invalid move, another player is on turn!'}
            }
        }
        gameMovesArray.push(data);
        if (gameMovesArray.length >= 5) {
            const winnerExists = this.checkForWinner(gameMovesArray, data.playerId);
            if (!winnerExists) {
                const winner = playersArray.find((elem) => elem.id === data.playerId)?.name;
                return { message: `Winner is ${winner}` };
            }
        }
        return data;
    }

    checkForWinner(gameMoves: GameMove[], playerId: String): boolean {
        const playerMoves = gameMoves.filter(
            (elem) => elem.playerId === playerId
        ).map((elem) => elem.position);

        const rules = this.rulesService.getRules();
        rules.every((set) => {
            const match = this.rulesService.matchArrays(playerMoves, set);
            if (match) {
                return false;
            }
            return true;
        });
        return true;
    }
}
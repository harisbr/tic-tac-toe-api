import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { GameSession } from '../entities/GameSession';
import { GameSessionInput } from './types/gameSessionInput';

import { v4 as uuid } from 'uuid';
import { GameService } from '../utils/GameService';
import { RulesService } from '../utils/RulesService';

@Resolver()
export class GameSessionResolver {
    constructor(
        public gameService: GameService,
        public rulesService: RulesService) {
        this.rulesService = new RulesService();
        this.gameService = new GameService(this.rulesService);
    }

    @Query(_returns => [GameSession])
    async returnGameSessions() {
        return [
            {
                gameType: '',
                winner: '',
                draw: false
            }
        ];
    }

    @Mutation(() => GameSession)
    async createGameSession(@Arg('data'){ gameType }: GameSessionInput): Promise<GameSession> {
        const newGame = {
            id: uuid(),
            gameType,
            winner: '',
            draw: false,
        }
        return this.gameService.createGameSession(newGame);
    }
}
import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { GameMove } from '../entities/GameMove';
import { GameMoveInput } from './types/gameMoveInput';

import { v4 as uuid } from 'uuid';
import { GameService } from '../utils/GameService';
import { RulesService } from '../utils/RulesService';

@Resolver()
export class GameMoveResolver {
    constructor(
        public gameService: GameService,
        public rulesService: RulesService) {
        this.rulesService = new RulesService();
        this.gameService = new GameService(this.rulesService);
    }

    @Query(_returns => [GameMove])
    async returnGameSessions() {
        return [
            {
                gameType: '',
                winner: '',
                draw: false
            }
        ];
    }

    @Mutation(() => GameMove)
    async makeMove(@Arg('data'){ position, gameSessionId, playerId }: GameMoveInput): Promise<GameMove | any> {
        const newMove = {
            id: uuid(),
            position,
            gameSessionId,
            playerId
        }
        return this.gameService.makeMove(newMove);
    }
}
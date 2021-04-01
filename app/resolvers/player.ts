import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Player } from '../entities/Player';
import { PlayerInput } from './types/playerInput';

import { v4 as uuid } from 'uuid';
import { GameService } from '../utils/GameService';
import { RulesService } from '../utils/RulesService';

let players: Player[] = [];

@Resolver()
export class PlayerResolver {
    constructor(
        public gameService: GameService,
        public rulesService: RulesService) {
        this.rulesService = new RulesService();
        this.gameService = new GameService(this.rulesService);
    }

    @Query(_returns => Player)
    async returnPlayer(@Arg('id') id: string) {
        const player = players.find((elem) => {
            elem.id === id
        });
        if (player) {
            return player;
        } else {
            return { message: 'No player with given id.' }
        }
    }

    @Mutation(() => Player)
    async addPlayer(@Arg('data'){ name, sign, gameSessionId }: PlayerInput): Promise<Player | {}> {
        const newPlayer = {
            id: uuid(),
            name,
            sign,
            gameSessionId,
        }
        return this.gameService.addPlayer(newPlayer);
    }
}
import { InputType, Field, Int } from 'type-graphql';
import { GameMove } from '../../entities/GameMove';

@InputType()
export class GameMoveInput implements Partial<GameMove> {
    
    @Field(_type => Int)
    position: number;

    @Field()
    playerId: String;

    @Field()
    gameSessionId: String;
}
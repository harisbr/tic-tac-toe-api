import { InputType, Field } from 'type-graphql';
import { GameSession } from '../../entities/GameSession';

@InputType()
export class GameSessionInput implements Partial<GameSession> {
    
    @Field()
    gameType: String
}
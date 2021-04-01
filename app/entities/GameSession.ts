import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

// import { GameMove } from './GameMove';

@ObjectType({ description: 'The GameMove model' })
export class GameSession {
    @Field(() => ID)
    id: String;

    @Field()
    @Property()
    gameType: String;

    @Field()
    @Property()
    winner: String;

    @Field()
    @Property()
    draw: Boolean;

    // @Field(_type => GameMove)
    // @Property({ ref: GameMove })
    // gameMoves: [GameMove]
}

// for possible future db implementation
export const GameSessionModel = getModelForClass(GameSession);

import { ObjectType, Field, ID, Int } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';


@ObjectType({ description: 'The GameMove model' })
export class GameMove {
    @Field(() => ID)
    id: String;

    @Field( _type => Int)
    @Property()
    position: number;

    @Field()
    @Property()
    gameSessionId: String;

    @Field()
    @Property()
    playerId: String;
}

// for possible future db implementation
export const GameMoveModel = getModelForClass(GameMove);

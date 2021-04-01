import { ObjectType, Field, ID } from 'type-graphql';
import { prop as Property, getModelForClass } from '@typegoose/typegoose';

@ObjectType({ description: 'The Player model' })
export class Player {
    @Field(() => ID)
    id: String;

    @Field()
    @Property()
    name: String;

    @Field()
    @Property()
    sign: String;

    @Field()
    @Property()
    gameSessionId: String;
}

// for possible future db implementation
export const PlayersModel = getModelForClass(Player);
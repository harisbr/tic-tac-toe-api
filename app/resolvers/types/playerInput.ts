import { InputType, Field } from 'type-graphql';
import { Player } from '../../entities/Player';

@InputType()
export class PlayerInput implements Partial<Player> {
    
    @Field()
    name: String;

    @Field()
    sign: String;

    @Field()
    gameSessionId: String;
}
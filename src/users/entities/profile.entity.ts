import { AbstractEntity } from "../../common/base.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile extends AbstractEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

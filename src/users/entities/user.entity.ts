import { AbstractEntity } from '../../common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User extends AbstractEntity{
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  username: string

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Profile, profile => profile.user, { onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile
}

import { AbstractEntity } from 'src/common/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity{
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}

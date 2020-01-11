import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  passwordHash!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

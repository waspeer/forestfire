import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text', { unique: true })
  email!: string;

  @Column('text')
  passwordHash!: string;
}

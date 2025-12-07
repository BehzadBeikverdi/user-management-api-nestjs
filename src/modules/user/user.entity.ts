import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import {RoleEnum} from "../../common/eums/roleEnum";

@Entity({ name: `${BaseEntity.PREFIX}users` })
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column({ unique: true })
    email: string; // Optional, just an example

    @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
    role: RoleEnum;
}

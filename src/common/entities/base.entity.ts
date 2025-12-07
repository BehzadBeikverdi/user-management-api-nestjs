import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';

export abstract class BaseEntity {
    protected static readonly PREFIX = 'user_panel__';

    @PrimaryGeneratedColumn('uuid')
    id: string; // UUID like Spring Boot

    @VersionColumn()
    version: number;

    @CreateDateColumn({type: 'timestamp with time zone', name: 'created'})
    createDate: Date;

    @UpdateDateColumn({type: 'timestamp with time zone', name: 'updated'})
    updateDate: Date;
}

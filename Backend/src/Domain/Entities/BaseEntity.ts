import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { IAuditable } from "../Interfaces/IAuditable";
import { IDeletable } from "../Interfaces/IDeletable";

export interface IEntity extends IAuditable, IDeletable {

}

export abstract class BaseEntity<TKey> implements IEntity {
    @PrimaryGeneratedColumn("uuid")
    id: TKey;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @Column({ type: "nvarchar", nullable: true })
    createdBy?: string | undefined;

    @Column({ type: "nvarchar", nullable: true })
    updatedBy?: string | undefined;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date | undefined;

    @Column({ type: "nvarchar", nullable: true })
    deletedBy?: string | undefined;

    constructor(id: TKey, createdAt: Date, updatedAt: Date, isDeleted: boolean) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted;
    }
}

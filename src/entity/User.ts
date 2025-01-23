import { Entity, PrimaryGeneratedColumn, Column, Timestamp, OneToMany } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string 

    @Column({
        unique:true
    })
    email: string 

    @Column()
    age: number

    @Column({
        type: "enum",
        enum: ["ADMIN", "USER"],
        default: "USER"
    })
    role: string

    @Column({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date

    @Column({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP"
    })
    updatedAt: Date

    @Column({
        type: "timestamptz",
        default: null,
        nullable: true,
        onUpdate: "CURRENT_TIMESTAMP"
    })
    deletedAt: Date
}

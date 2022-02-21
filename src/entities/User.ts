import {v4 as uuid} from 'uuid';
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Roles } from "./Role";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["id"], { unique: true })
@Index("users_nickname_key", ["nickname"], { unique: true })
@Entity("users", { schema: "public" })
export class User {
  @Column("text", { primary: true, name: "id" })
  id: string;

  @Column("text", { unique: true })
  nickname: string;

  @Column("text")
  name: string;

  @Column("text", { unique: true })
  email: string;

  @Column("text", { nullable: true })
  avatar: string | null;

  @Column("boolean", { default: () => "false" })
  blocked: boolean;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp with time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @ManyToOne(() => Roles, (roles) => roles.users, {
    cascade: true,
  })
  @JoinColumn([{ name: "role", referencedColumnName: "rule" }])
  role: Roles;

  constructor(){
    if(!this.id){
      this.id =  uuid();
    }
  }
}

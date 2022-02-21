import { Column, Entity, Index, OneToMany } from "typeorm";
import { User } from "./User";

@Index("roles_pkey", ["rule"], { unique: true })
@Entity("roles", { schema: "public" })
export class Roles {
  @Column("text", { primary: true})
  rule: string;

  @OneToMany(() => User, (users) => users.role)
  users: User[];
}

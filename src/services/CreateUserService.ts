import { getRepository } from "typeorm";
import { User } from "../entities/User";

type UserRequest = {
  id: string;
  name: string;
  email: string;
};

export class CreateUserService {
  async execute({ id, name, email }: UserRequest): Promise<User | Error> {
    const repo = getRepository(User);
    if (await repo.findOne({ id: id })) {
      return new Error("already exists user with this id");
    }
    try {
      const user = repo.create({
        id: id,
        name: name,
        nickname: name,
        email: email,
      });
      await repo.save(user);
      return user;
    } catch (e) {
      return new Error(e);
    }
  }
}

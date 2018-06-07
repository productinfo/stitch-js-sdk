import { Codec } from "stitch-core";
import { User } from "../Resources";

// / Creates a new user for an application
export interface UserCreator {
  readonly email: string;
  readonly password: string;
}

export class UserCreatorCodec implements Codec<UserCreator> {
  public decode(from: object): UserCreator {
    return {
      email: from["email"],
      password: from["password"]
    };
  }

  public encode(from: UserCreator): object {
    return {
      email: from.email,
      password: from.password
    };
  }
}

// / View of a User of an application
enum Fields {
  Id = "_id"
}

export interface UserResponse {
  readonly id: string;
}

export class UserResponseCodec implements Codec<UserResponse> {
  public decode(from: object): UserResponse {
    return {
      id: from[Fields.Id]
    };
  }

  public encode(from: UserResponse): object {
    return {
      [Fields.Id]: from.id
    };
  }
}

interface Users {
  user(uid: string): User;
}
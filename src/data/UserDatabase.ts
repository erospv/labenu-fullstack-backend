import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "user_labesound";

  public async createUser(user: User): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id: user.getId(),
          name: user.getName(),
          email: user.getEmail(),
          nickname: user.getNickname(),
          password: user.getPassword()
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmailOrNickname(emailOrNickname: string): Promise<User | undefined> {
    try{
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email: emailOrNickname })
        .orWhere({ nickname: emailOrNickname });
  
      if(!result[0]) return
    
      return User.toUserModel(result[0])

    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }


 

  
}

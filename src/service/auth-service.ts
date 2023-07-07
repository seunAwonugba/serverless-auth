import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { User } from "../models/user";

class AuthService {
    private tableName = "userTable2";
    constructor(private documentClient: DocumentClient) {}

    async signUp(user: User): Promise<User> {
        await this.documentClient
            .put({
                TableName: this.tableName,
                Item: user,
            })
            .promise();

        return user;
    }

    // async getUsers(): Promise<User[]> {
    //     const users = await this.documentClient
    //         .scan({
    //             TableName: this.tableName,
    //         })
    //         .promise();

    //     return users.Items as User[];
    // }
}

export { AuthService };

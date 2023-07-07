import { dynamoDBClient } from "../models/index";
import { AuthService } from "./auth-service";

const userService = new AuthService(dynamoDBClient());

export { userService };

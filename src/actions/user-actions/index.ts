import * as userInfo from "./user-info.action";
import * as contactUser from "./contact-user.action";
export const userActions = { ...userInfo, ...contactUser };

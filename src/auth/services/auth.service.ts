import { NotFoundError } from "../../utils/error.response.js";
import { getDbRoleById, getDbUserAvatarById } from "./auth.repo.js";

export const getRoleById = async (userId: string) => {
  const role = await getDbRoleById(userId);

  if (!role) {
    throw new NotFoundError();
  }

  return role.role_name;
};

export const getUserAvatarById = async (userId: string) => {
  const user = await getDbUserAvatarById(userId);

  if (!user) {
    throw new Error();
  }

  return user.avatar;
};

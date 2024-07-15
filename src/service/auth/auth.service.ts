import { NotFoundError } from "../../utils/error.response.js";
import { getDbRoleById } from "./auth.repo.js";

export const getRoleById = async (userId: string) => {
  const role = await getDbRoleById(userId);

  if (!role) {
    throw new NotFoundError();
  }

  return role.role_name;
};

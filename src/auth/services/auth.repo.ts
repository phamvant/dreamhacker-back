import postgres from "../../db/db.js";

export const getDbRoleById = async (userId: string) => {
  const role = await postgres.query(
    `
    SELECT r.role_name FROM
    public.role r
    INNER JOIN public.user_roles ur
    ON r.id = ur.role_id
    INNER JOIN public.user u
    ON u.id = ur.user_id
    WHERE u.id = $1;
    `,
    [userId]
  );

  if (!role.rowCount) {
    return false;
  }

  return role.rows[0];
};

export const getDbUserAvatarById = async (userId: string) => {
  const avatar = await postgres.query(
    `
    SELECT avatar from public.user WHERE id=$1
    `,
    [userId]
  );

  if (!avatar.rowCount) {
    return false;
  }

  return avatar.rows[0];
};

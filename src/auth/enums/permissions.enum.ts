export enum Permission {
    READ_ALL_USERS = 'read:all_users',
    READ_ONE_USER = 'read:one_user',
    READ_OWN_USER = 'read:own_user',
    UPDATE_ONE_USER = 'update:one_user',
    UPDATE_OWN_USER = 'update:own_user',
    TOGGLE_OWN_USER_STATUS = 'toggle:own_user_status',
    TOGGLE_ONE_USER_STATUS = 'toggle:one_user_status',
    DELETE_ONE_USER = 'delete:one_user',
    DELETE_OWN_USER = 'delete:own_user',
  }
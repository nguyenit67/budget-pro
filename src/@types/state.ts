import userApi from 'services/userApi';

export type UserBasicInfo = ReturnType<typeof userApi.getMe>;

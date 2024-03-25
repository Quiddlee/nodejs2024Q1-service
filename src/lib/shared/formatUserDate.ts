import { User } from '@prisma/client';

const formatUserDate = (user: User) => ({
  ...user,
  createdAt: new Date(user.createdAt).getTime(),
  updatedAt: new Date(user.updatedAt).getTime(),
});

export default formatUserDate;

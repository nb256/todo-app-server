import prisma from ".";

export default async function createUser(
  email: string,
  password: string,
  name: string
) {
  const user = await prisma.user.create({
    data: {
      email,
      password,
      name,
    },
  });

  return user;
}

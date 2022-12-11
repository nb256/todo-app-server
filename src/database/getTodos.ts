import prisma from ".";

export default async function getTodos() {
  const todos = await prisma.todo.findMany();
  return todos;
}

import prisma from ".";

export default async function deleteTodo(id: number) {
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });

  return todo;
}

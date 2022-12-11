import { TodoStatus } from "@prisma/client";
import prisma from ".";

export default async function markTodoUncompleted(id: number) {
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      status: TodoStatus.UNCOMPLETED,
    },
  });

  return todo;
}

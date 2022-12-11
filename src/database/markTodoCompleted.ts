import { TodoStatus } from "@prisma/client";
import prisma from ".";

export default async function markTodoCompleted(id: number) {
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      status: TodoStatus.COMPLETED,
    },
  });

  return todo;
}

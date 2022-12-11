import { TodoStatus } from "@prisma/client";
import prisma from ".";

export default async function createTodo(
  title: string,
  status: TodoStatus = TodoStatus.UNCOMPLETED
) {
  const todo = await prisma.todo.create({
    data: {
      title,
      status,
    },
  });

  return todo;
}

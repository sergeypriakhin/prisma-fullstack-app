import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const db = new PrismaClient();

async function main() {
  await db.post.create({
    data: {
      title: "What are your weaknesses?",
      text: '"What are your weaknesses" is one of the most popular questions interviewers ask. It is also the most dreaded question of all. Handle it by minimizing your weakness and emphasizing your strengths. Stay away from personal qualities and concentrate on professional traits: "I am always working on improving my communication skills to be a more effective presenter. I recently joined Toastmasters, which I find very helpful."',
      author: {
        create: {
          name: "Sergey",
          email: "sergey@email.com",
          password: await hash("12345", 10),
        },
      },
    },
  });
}

main().finally(() => {
  db.$disconnect();
});

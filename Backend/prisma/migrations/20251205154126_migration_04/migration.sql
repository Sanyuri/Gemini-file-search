/*
  Warnings:

  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_sessionChatId_fkey";

-- DropTable
DROP TABLE "Question";

-- CreateTable
CREATE TABLE "ChatHistory" (
    "id" UUID NOT NULL,
    "chatHistory" TEXT NOT NULL,
    "sourceUrls" TEXT,
    "sessionChatId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "ChatHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatHistory" ADD CONSTRAINT "ChatHistory_sessionChatId_fkey" FOREIGN KEY ("sessionChatId") REFERENCES "SessionChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

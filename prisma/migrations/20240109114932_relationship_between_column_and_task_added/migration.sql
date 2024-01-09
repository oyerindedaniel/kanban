/*
  Warnings:

  - You are about to drop the column `boardId` on the `SubTask` table. All the data in the column will be lost.
  - Added the required column `columnId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_boardId_fkey";

-- AlterTable
ALTER TABLE "SubTask" DROP COLUMN "boardId";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "columnId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

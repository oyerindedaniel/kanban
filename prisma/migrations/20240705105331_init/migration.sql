/*
  Warnings:

  - You are about to drop the column `currentStatus` on the `SubTask` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Board` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[boardId,name]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[columnId,name]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Board` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SubTask_name_key";

-- DropIndex
DROP INDEX "Task_name_key";

-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubTask" DROP COLUMN "currentStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Board_slug_key" ON "Board"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Column_boardId_name_key" ON "Column"("boardId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Task_columnId_name_key" ON "Task"("columnId", "name");

-- DropIndex
DROP INDEX "Board_id_idx";

-- DropIndex
DROP INDEX "Column_id_idx";

-- DropIndex
DROP INDEX "SubTask_id_idx";

-- DropIndex
DROP INDEX "Task_id_idx";

-- AlterTable
ALTER TABLE "SubTask" ALTER COLUMN "isCompleted" DROP NOT NULL,
ALTER COLUMN "currentStatus" DROP NOT NULL;

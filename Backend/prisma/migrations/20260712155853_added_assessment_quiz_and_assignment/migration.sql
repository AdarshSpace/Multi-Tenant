-- AlterTable
ALTER TABLE `videos` ADD COLUMN `assignment` JSON NULL,
    ADD COLUMN `quiz` JSON NULL;

-- CreateTable
CREATE TABLE `student_quiz_responses` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `answers` JSON NOT NULL,
    `score` INTEGER NOT NULL,
    `totalQuestions` INTEGER NOT NULL,
    `submittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `student_quiz_responses_studentId_idx`(`studentId`),
    INDEX `student_quiz_responses_videoId_idx`(`videoId`),
    UNIQUE INDEX `student_quiz_responses_studentId_videoId_key`(`studentId`, `videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `student_quiz_responses` ADD CONSTRAINT `student_quiz_responses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `student_quiz_responses` ADD CONSTRAINT `student_quiz_responses_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `videos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

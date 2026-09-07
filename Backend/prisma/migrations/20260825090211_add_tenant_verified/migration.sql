/*
  Warnings:

  - Made the column `subdomain` on table `Tenant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `customDomain` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Tenant` ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `subdomain` VARCHAR(191) NOT NULL,
    MODIFY `customDomain` VARCHAR(191) NOT NULL;

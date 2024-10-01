-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'basic', 'professional', 'enterprise');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "current_verify_token" TEXT NOT NULL DEFAULT '',
    "current_reset_token" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_users" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verify_token" TEXT,
    "verify_token_expires_at" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_votations" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "min_preferences" INTEGER NOT NULL,
    "max_preferences" INTEGER NOT NULL,
    "intralist" BOOLEAN NOT NULL,
    "opened" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_votations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_lists" (
    "id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organization_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_votation_users" (
    "organization_id" TEXT NOT NULL,
    "votation_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "has_voted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "organization_votation_users_pkey" PRIMARY KEY ("organization_id","votation_id","user_id")
);

-- CreateTable
CREATE TABLE "organization_votation_lists" (
    "organization_id" TEXT NOT NULL,
    "votation_id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,

    CONSTRAINT "organization_votation_lists_pkey" PRIMARY KEY ("organization_id","votation_id","list_id")
);

-- CreateTable
CREATE TABLE "organization_list_candidates" (
    "organization_id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "organization_list_candidates_pkey" PRIMARY KEY ("organization_id","list_id","user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "organizations_user_id_idx" ON "organizations"("user_id");

-- CreateIndex
CREATE INDEX "organization_users_organization_id_idx" ON "organization_users"("organization_id");

-- CreateIndex
CREATE INDEX "organization_votations_organization_id_idx" ON "organization_votations"("organization_id");

-- CreateIndex
CREATE INDEX "organization_lists_organization_id_idx" ON "organization_lists"("organization_id");

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_users" ADD CONSTRAINT "organization_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votations" ADD CONSTRAINT "organization_votations_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_lists" ADD CONSTRAINT "organization_lists_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_users" ADD CONSTRAINT "organization_votation_users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_users" ADD CONSTRAINT "organization_votation_users_votation_id_fkey" FOREIGN KEY ("votation_id") REFERENCES "organization_votations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_users" ADD CONSTRAINT "organization_votation_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "organization_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_lists" ADD CONSTRAINT "organization_votation_lists_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_lists" ADD CONSTRAINT "organization_votation_lists_votation_id_fkey" FOREIGN KEY ("votation_id") REFERENCES "organization_votations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_votation_lists" ADD CONSTRAINT "organization_votation_lists_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "organization_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_list_candidates" ADD CONSTRAINT "organization_list_candidates_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_list_candidates" ADD CONSTRAINT "organization_list_candidates_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "organization_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_list_candidates" ADD CONSTRAINT "organization_list_candidates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "organization_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

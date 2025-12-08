-- CreateTable
CREATE TABLE "FileSearchStore" (
    "id" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "sizeBytes" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,

    CONSTRAINT "FileSearchStore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FileSearchStore" ADD CONSTRAINT "FileSearchStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

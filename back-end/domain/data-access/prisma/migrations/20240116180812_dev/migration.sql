-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "familyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "activityName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "categoryName" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "locality" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "streetNumber" INTEGER NOT NULL,
    "postalCode" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ActivityToParticipant" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ActivityToParticipant_AB_unique" ON "_ActivityToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_ActivityToParticipant_B_index" ON "_ActivityToParticipant"("B");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToParticipant" ADD CONSTRAINT "_ActivityToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Activity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActivityToParticipant" ADD CONSTRAINT "_ActivityToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TYPE "ExerciseFormat" AS ENUM ('TEXTE', 'PDF');

ALTER TABLE "assessments"
ADD COLUMN "exerciseFormat" "ExerciseFormat" NOT NULL DEFAULT 'TEXTE',
ADD COLUMN "exercisePdfKey" TEXT,
ADD COLUMN "exercisePdfName" TEXT,
ADD COLUMN "correctionPdfKey" TEXT,
ADD COLUMN "correctionPdfName" TEXT;


import 'dotenv/config';

import {
  S3Client,
  PutObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'node:crypto';

const required = [
  'S3_ENDPOINT',
  'S3_REGION',
  'S3_BUCKET',
  'S3_ACCESS_KEY_ID',
  'S3_SECRET_ACCESS_KEY',
];

const missing = required.filter(
  (key) => !process.env[key]?.trim(),
);

if (missing.length > 0) {
  console.error('Variables manquantes :', missing.join(', '));
  process.exit(1);
}

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION;
const bucket = process.env.S3_BUCKET;

if (!endpoint.includes(`s3.${region}.backblazeb2.com`)) {
  console.error('Erreur : région et endpoint incompatibles.');
  process.exit(1);
}

const client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const storageKey = `tests/${randomUUID()}.txt`;
const expectedContent =
  'Test de stockage G-EDUC - Backblaze B2';

const buffer = Buffer.from(expectedContent, 'utf-8');

let uploaded = false;

async function runTests() {
  try {
    // 1. Upload
    console.log('\n[1/5] Envoi du fichier...');
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: storageKey,
        Body: buffer,
        ContentType: 'text/plain',
        ContentLength: buffer.length,
      }),
    );
    uploaded = true;
    console.log('OK : fichier envoyé.');

    // 2. Vérification de présence
    console.log('\n[2/5] Vérification du fichier...');
    const head = await client.send(
      new HeadObjectCommand({
        Bucket: bucket,
        Key: storageKey,
      }),
    );

    if (head.ContentLength !== buffer.length) {
      throw new Error('La taille du fichier ne correspond pas.');
    }

    console.log('OK : fichier présent.');
    console.log('Taille :', head.ContentLength, 'octets');

    // 3. Génération du lien signé
    console.log('\n[3/5] Génération du lien signé...');
    const signedUrl = await getSignedUrl(
      client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: storageKey,
      }),
      { expiresIn: 300 },
    );

    console.log('OK : lien signé généré.');

    // 4. Téléchargement et vérification du contenu
    console.log('\n[4/5] Téléchargement via le lien signé...');
    const response = await fetch(signedUrl);

    if (!response.ok) {
      throw new Error(
        `Téléchargement impossible : HTTP ${response.status}`,
      );
    }

    const downloadedContent = await response.text();

    if (downloadedContent !== expectedContent) {
      throw new Error('Le contenu téléchargé est incorrect.');
    }

    console.log('OK : contenu téléchargé et vérifié.');

    // 5. Suppression et vérification
    console.log('\n[5/5] Suppression du fichier...');
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: storageKey,
      }),
    );

    uploaded = false;

    try {
      await client.send(
        new HeadObjectCommand({
          Bucket: bucket,
          Key: storageKey,
        }),
      );

      throw new Error(
        'Le fichier existe encore après sa suppression.',
      );
    } catch (error) {
      if (error.message === 'Le fichier existe encore après sa suppression.') {
        throw error;
      }

      const status = error.$metadata?.httpStatusCode;

      if (status !== 404 && error.name !== 'NotFound') {
        throw error;
      }
    }

    console.log('OK : fichier supprimé et absence vérifiée.');

    console.log('\n================================');
    console.log('TOUS LES TESTS SONT RÉUSSIS');
    console.log('================================');
    console.log('Bucket :', bucket);
    console.log('Clé testée :', storageKey);
  } catch (error) {
    console.error('\nÉCHEC DU TEST');
    console.error('Type :', error.name);
    console.error('Message :', error.message);
    console.error(
      'Code HTTP :',
      error.$metadata?.httpStatusCode ?? 'inconnu',
    );

    process.exitCode = 1;
  } finally {
    // Nettoyage de sécurité en cas d'échec
    if (uploaded) {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: bucket,
            Key: storageKey,
          }),
        );
        console.log('\nNettoyage : fichier temporaire supprimé.');
      } catch {
        console.error(
          '\nATTENTION : nettoyage impossible. Clé :',
          storageKey,
        );
      }
    }

    client.destroy();
  }
}

runTests();

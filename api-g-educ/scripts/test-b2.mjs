
import 'dotenv/config';

import {
  S3Client,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';

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
  console.error(
    'Variables manquantes :',
    missing.join(', '),
  );
  process.exit(1);
}

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION;

if (!endpoint.includes(`s3.${region}.backblazeb2.com`)) {
  console.error(
    'Erreur : la région ne correspond pas à l’endpoint S3.',
  );
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

async function testConnection() {
  try {
    const result = await client.send(
      new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET,
        MaxKeys: 1,
      }),
    );

    console.log('Connexion Backblaze B2 réussie !');
    console.log('Bucket :', process.env.S3_BUCKET);
    console.log('Endpoint :', endpoint);
    console.log('Région :', region);
    console.log(
      'Nombre de fichiers retournés :',
      result.KeyCount ?? 0,
    );
  } catch (error) {
    console.error('Échec de la connexion Backblaze B2.');
    console.error('Type :', error.name);
    console.error('Message :', error.message);
    console.error(
      'Code HTTP :',
      error.$metadata?.httpStatusCode ?? 'inconnu',
    );
    process.exitCode = 1;
  } finally {
    client.destroy();
  }
}

testConnection();

import { storagePut } from './server/storage.ts';
import fs from 'fs';

const files = [
  { local: '/home/ubuntu/upload/Service_Environmental_COI(1).pdf', s3: 'services/Service_Environmental_COI.pdf' },
  { local: '/home/ubuntu/upload/Service_Quality_Systems.pdf', s3: 'services/Service_Quality_Systems.pdf' },
  { local: '/home/ubuntu/upload/Service_Supplier_Risk.pdf', s3: 'services/Service_Supplier_Risk.pdf' },
  { local: '/home/ubuntu/upload/Service_Buy_American.pdf', s3: 'services/Service_Buy_American.pdf' },
  { local: '/home/ubuntu/upload/Service_Conflict_Minerals.pdf', s3: 'services/Service_Conflict_Minerals.pdf' },
  { local: '/home/ubuntu/upload/Service_Small_Business.pdf', s3: 'services/Service_Small_Business.pdf' },
  { local: '/home/ubuntu/upload/Service_Cybersecurity.pdf', s3: 'services/Service_Cybersecurity.pdf' },
  { local: '/home/ubuntu/upload/Service_Export_Control.pdf', s3: 'services/Service_Export_Control.pdf' },
  { local: '/home/ubuntu/upload/Service_Reps_Certs(1).pdf', s3: 'services/Service_Reps_Certs.pdf' },
];

async function uploadAll() {
  console.log('Starting S3 uploads...\n');
  
  for (const file of files) {
    try {
      const fileBuffer = fs.readFileSync(file.local);
      const result = await storagePut(file.s3, fileBuffer, 'application/pdf');
      console.log(`✓ Uploaded: ${file.s3}`);
      console.log(`  URL: ${result.url}\n`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file.s3}:`, error.message);
    }
  }
  
  console.log('Upload complete!');
}

uploadAll();

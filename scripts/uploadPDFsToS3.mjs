#!/usr/bin/env node
/**
 * Upload all PDF assets to S3 storage
 * 
 * This script uploads 47 PDFs organized in 4 categories:
 * - Case Studies (17)
 * - Services (9)
 * - Marketing (3)
 * - Capability PDFs (to be added later)
 * 
 * Usage: node scripts/uploadPDFsToS3.mjs
 */

import { storagePut } from '../server/storage.ts';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BASE_PATH = './client/public';

const categories = [
  { dir: 'case-studies', s3Prefix: 'pdfs/case-studies/' },
  { dir: 'services', s3Prefix: 'pdfs/services/' },
  { dir: 'marketing', s3Prefix: 'pdfs/marketing/' },
];

async function uploadPDFs() {
  console.log('🚀 Starting PDF upload to S3...\n');
  
  let totalUploaded = 0;
  let totalFailed = 0;
  const uploadedFiles = [];

  for (const category of categories) {
    const dirPath = join(BASE_PATH, category.dir);
    console.log(`📁 Processing ${category.dir}...`);
    
    try {
      const files = readdirSync(dirPath).filter(f => f.endsWith('.pdf'));
      console.log(`   Found ${files.length} PDF files`);
      
      for (const file of files) {
        const filePath = join(dirPath, file);
        const s3Key = `${category.s3Prefix}${file}`;
        
        try {
          const fileBuffer = readFileSync(filePath);
          const result = await storagePut(s3Key, fileBuffer, 'application/pdf');
          
          uploadedFiles.push({
            category: category.dir,
            filename: file,
            s3Key: result.key,
            url: result.url,
            size: fileBuffer.length
          });
          
          console.log(`   ✅ ${file} → ${result.key}`);
          totalUploaded++;
        } catch (error) {
          console.error(`   ❌ Failed to upload ${file}:`, error.message);
          totalFailed++;
        }
      }
      
      console.log('');
    } catch (error) {
      console.error(`   ❌ Failed to read directory ${dirPath}:`, error.message);
    }
  }
  
  console.log('\n📊 Upload Summary:');
  console.log(`   ✅ Successfully uploaded: ${totalUploaded}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   📦 Total size: ${(uploadedFiles.reduce((sum, f) => sum + f.size, 0) / 1024 / 1024).toFixed(2)} MB`);
  
  // Save upload manifest
  const manifest = {
    uploadedAt: new Date().toISOString(),
    totalFiles: totalUploaded,
    files: uploadedFiles
  };
  
  const manifestPath = './scripts/s3-upload-manifest.json';
  const { writeFileSync } = await import('fs');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📝 Upload manifest saved to ${manifestPath}`);
  
  return uploadedFiles;
}

// Run the upload
uploadPDFs()
  .then((files) => {
    console.log('\n✨ PDF upload complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Upload failed:', error);
    process.exit(1);
  });

/**
 * S3 Download Helpers
 * 
 * Utilities for downloading PDFs from S3 storage with pre-signed URLs
 */

/**
 * Get a pre-signed S3 download URL for a PDF
 * 
 * @param s3Key - The S3 key for the PDF (e.g., "pdfs/case-studies/Case_Study_01.pdf")
 * @returns Pre-signed URL valid for 1 hour
 */
export async function getS3DownloadUrl(s3Key: string): Promise<string> {
  const response = await fetch(`/api/downloads/getDownloadUrl?input=${encodeURIComponent(JSON.stringify({ s3Key }))}`);
  
  if (!response.ok) {
    throw new Error(`Failed to get download URL: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.result.data.url;
}

/**
 * Trigger a download for a PDF from S3
 * 
 * @param s3Key - The S3 key for the PDF
 */
export async function downloadFromS3(s3Key: string): Promise<void> {
  try {
    const url = await getS3DownloadUrl(s3Key);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Failed to download from S3:", error);
    throw error;
  }
}

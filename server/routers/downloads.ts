import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc.js";
import { storageGet } from "../storage.js";

/**
 * Download router - handles PDF downloads with S3 pre-signed URLs
 * 
 * Provides secure, time-limited download URLs for all PDF assets
 */

export const downloadsRouter = router({
  /**
   * Get a pre-signed download URL for a PDF
   * 
   * @param s3Key - The S3 key for the PDF (e.g., "pdfs/case-studies/Case_Study_01.pdf")
   * @returns Pre-signed URL valid for 1 hour
   */
  getDownloadUrl: publicProcedure
    .input(
      z.object({
        s3Key: z.string(),
      })
    )
    .query(async ({ input }: { input: { s3Key: string } }) => {
      const { s3Key } = input;
      
      // Generate pre-signed URL valid for 1 hour (storageGet only takes key parameter)
      const result = await storageGet(s3Key);
      
      return {
        url: result.url,
        key: result.key,
        expiresIn: 3600,
      };
    }),
});

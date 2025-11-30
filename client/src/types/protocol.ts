/**
 * Type definitions for protocol case studies
 */

export interface ProtocolCaseStudy {
  s3Key: string;
  title: string;
}

export type ProtocolCaseStudiesMap = Record<string, ProtocolCaseStudy>;

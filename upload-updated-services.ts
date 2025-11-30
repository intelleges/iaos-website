import { storagePut } from "./server/_core/storage";
import { readFileSync } from "fs";

const files = [
  { local: "/home/ubuntu/upload/Service_Environmental_COI(2).pdf", s3: "services/Service_Environmental_COI.pdf" },
  { local: "/home/ubuntu/upload/Service_Quality_Systems(1).pdf", s3: "services/Service_Quality_Systems.pdf" },
  { local: "/home/ubuntu/upload/Service_Supplier_Risk(1).pdf", s3: "services/Service_Supplier_Risk.pdf" },
  { local: "/home/ubuntu/upload/Service_Buy_American(1).pdf", s3: "services/Service_Buy_American.pdf" },
  { local: "/home/ubuntu/upload/Service_Conflict_Minerals(1).pdf", s3: "services/Service_Conflict_Minerals.pdf" },
  { local: "/home/ubuntu/upload/Service_Small_Business(1).pdf", s3: "services/Service_Small_Business.pdf" },
  { local: "/home/ubuntu/upload/Service_Cybersecurity(1).pdf", s3: "services/Service_Cybersecurity.pdf" },
  { local: "/home/ubuntu/upload/Service_Export_Control(1).pdf", s3: "services/Service_Export_Control.pdf" },
  { local: "/home/ubuntu/upload/Service_Reps_Certs(2).pdf", s3: "services/Service_Reps_Certs.pdf" },
];

async function uploadAll() {
  for (const file of files) {
    try {
      const buffer = readFileSync(file.local);
      const result = await storagePut(file.s3, buffer, "application/pdf");
      console.log(`✓ Uploaded: ${file.s3} → ${result.url}`);
    } catch (error) {
      console.error(`✗ Failed to upload ${file.local}:`, error);
    }
  }
}

uploadAll().then(() => {
  console.log("\n✅ All service PDFs uploaded successfully!");
  process.exit(0);
}).catch((error) => {
  console.error("\n❌ Upload failed:", error);
  process.exit(1);
});

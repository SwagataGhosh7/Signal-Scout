import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { PDFParse } from "pdf-parse";
import { analyzeResume } from "./resume-analyzer";

export const processResume = createServerFn({ method: "POST" })
  .validator(
    z.object({
      fileName: z.string(),
      fileType: z.string(),
      fileData: z.string(), // base64 encoded string
    })
  )
  .handler(async ({ data }) => {
    const { fileType, fileData } = data;
    
    try {
      let extractedText = "";
      const buffer = Buffer.from(fileData, "base64");

      if (fileType === "application/pdf") {
        const parser = new PDFParse({ data: buffer });
        const parsedPdf = await parser.getText();
        extractedText = parsedPdf.text;
      } else if (fileType === "text/plain" || fileType.includes("markdown")) {
        extractedText = buffer.toString("utf-8");
      } else {
        throw new Error("Unsupported file type. Please upload a PDF or TXT file.");
      }

      if (!extractedText || extractedText.trim().length < 20) {
        throw new Error("Could not extract enough text from the file.");
      }

      const analysis = await analyzeResume(extractedText);
      return { success: true, analysis };
    } catch (error) {
      console.error("Resume processing error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "An unknown error occurred" 
      };
    }
  });

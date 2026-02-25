import { getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";

type SourceType = "pdf" | "docx" | "image" | "text" | "unknown";

export type ExtractedCV = {
  text: string;
  sourceType: SourceType;
  wordCount: number;
  pageCount?: number;
  metadata?: Record<string, string | number | boolean | null>;
};

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const bufferFromFile = async (file: File) =>
  Buffer.from(await file.arrayBuffer());

const extractFromPdf = async (buffer: Buffer) => {
  const loadingTask = getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  let text = "";

  for (let i = 1; i <= pdf.numPages; i += 1) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = (content.items as Array<{ str?: string; text?: string }>)
      .map((item) => item.str ?? item.text ?? "")
      .join(" ");
    text += `${pageText} \n`;
  }

  return { text: normalizeWhitespace(text), pageCount: pdf.numPages };
};

const extractFromDocx = async (buffer: Buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return normalizeWhitespace(result.value);
};

const extractFromImage = async (buffer: Buffer) => {
  const { data } = await Tesseract.recognize(buffer, "eng", {
    logger: () => null,
  });
  return normalizeWhitespace(data.text || "");
};

const isImage = (mime: string, name: string) =>
  ["image/png", "image/jpeg", "image/webp"].includes(mime) ||
  /\.(png|jpe?g|webp)$/i.test(name);

const isPdf = (mime: string, name: string) =>
  mime === "application/pdf" || /\.pdf$/i.test(name);

const isDocx = (mime: string, name: string) =>
  mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
  /\.docx$/i.test(name);

export async function extractCV(file: File): Promise<ExtractedCV> {
  const contentType = file.type || "application/octet-stream";
  const buffer = await bufferFromFile(file);
  let sourceType: SourceType = "unknown";
  let text = "";
  let pageCount: number | undefined;

  if (isPdf(contentType, file.name)) {
    const pdf = await extractFromPdf(buffer);
    text = pdf.text;
    pageCount = pdf.pageCount;
    sourceType = "pdf";
  } else if (isDocx(contentType, file.name)) {
    text = await extractFromDocx(buffer);
    sourceType = "docx";
  } else if (isImage(contentType, file.name)) {
    text = await extractFromImage(buffer);
    sourceType = "image";
  } else if (contentType.startsWith("text/")) {
    text = buffer.toString("utf-8");
    sourceType = "text";
  } else {
    text = normalizeWhitespace(buffer.toString("utf-8"));
  }

  const cleaned = normalizeWhitespace(text);
  return {
    text: cleaned,
    sourceType,
    pageCount,
    wordCount: cleaned ? cleaned.split(/\s+/).length : 0,
    metadata: {
      filename: file.name,
      contentType,
      ocrUsed: sourceType === "image",
    },
  };
}

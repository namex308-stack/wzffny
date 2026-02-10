import crypto from "crypto";

export const KASHIER_BASE_URL = "https://checkout.kashier.io";

const SIGNATURE_FIELDS = [
  "paymentStatus",
  "cardDataToken",
  "maskedCard",
  "merchantOrderId",
  "orderId",
  "cardBrand",
  "orderReference",
  "transactionId",
  "amount",
  "currency",
] as const;

export type KashierPayload = Record<string, string | undefined>;

export const createOrderHash = ({
  merchantId,
  orderId,
  amount,
  currency,
  apiKey,
}: {
  merchantId: string;
  orderId: string;
  amount: string;
  currency: string;
  apiKey: string;
}) => {
  const path = `/?payment=${merchantId}.${orderId}.${amount}.${currency}`;
  return crypto.createHmac("sha256", apiKey).update(path).digest("hex");
};

export const buildSignaturePayload = (payload: KashierPayload) =>
  SIGNATURE_FIELDS.map((field) => `${field}=${payload[field] ?? ""}`).join("&");

export const verifySignature = (
  payload: KashierPayload,
  secret: string,
  signature: string,
) => {
  const signed = buildSignaturePayload(payload);
  const expected = crypto.createHmac("sha256", secret).update(signed).digest("hex");
  return safeCompare(expected, signature);
};

export const safeCompare = (left: string, right: string) => {
  if (!left || !right) {
    return false;
  }
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");
  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

export const addMonths = (date: Date, months: number) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

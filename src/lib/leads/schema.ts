import { z } from "zod";

const optionalText = (max: number) =>
  z.preprocess((value) => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  }, z.string().max(max).optional());

const requiredText = (max: number, message: string) =>
  z.preprocess((value) => {
    return typeof value === "string" ? value : "";
  }, z.string().trim().min(1, message).max(max, message));

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

const estimatedValueSchema = z
  .union([z.number(), z.string(), z.null(), z.undefined()])
  .optional()
  .transform((value) => {
    if (value === undefined || value === null || value === "") return undefined;
    const numeric = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(numeric) || numeric <= 0) return undefined;
    return Math.round(numeric);
  });

const sharedFields = {
  name: requiredText(120, "Name is required."),
  email: z.preprocess((value) => {
    return typeof value === "string" ? value : "";
  }, z.email("Enter a valid email address.")),
  phone: z.preprocess((value) => {
    return typeof value === "string" ? value : "";
  }, z
    .string()
    .trim()
    .min(1, "Phone is required.")
    .max(40, "Phone is too long.")
    .refine((value) => digitCount(value) >= 7, {
      message: "Enter a valid phone number.",
    })),
  message: optionalText(4000),
  source: optionalText(80),
  website: z.preprocess((value) => {
    return typeof value === "string" ? value : "";
  }, z.string().max(200).optional()),
  formStartedAt: z.coerce
    .number()
    .int("Invalid submission.")
    .positive("Invalid submission."),
  estimatedValue: estimatedValueSchema,
};

export const leadSubmissionSchema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("sell"),
    address: requiredText(300, "Property address is required."),
    timeline: optionalText(80),
    listingUrl: optionalText(2000),
    offerDeadline: optionalText(200),
    ...sharedFields,
  }),
  z.object({
    intent: z.literal("offer"),
    address: optionalText(300),
    listingUrl: optionalText(2000),
    offerDeadline: optionalText(200),
    timeline: optionalText(80),
    ...sharedFields,
  }),
]);

export type LeadSubmission = z.infer<typeof leadSubmissionSchema>;
export type LeadIntentType = LeadSubmission["intent"];

export type StoredLead = {
  id: string;
  createdAt: string;
  status: "new";
  intent: LeadIntentType;
  name: string;
  email: string;
  phone: string;
  address?: string;
  listingUrl?: string;
  timeline?: string;
  offerDeadline?: string;
  message?: string;
  estimatedValue?: number;
  source?: string;
  userAgent?: string;
};

export function leadTypeLabel(intent: LeadIntentType) {
  return intent === "offer" ? "BUYER" : "SELLER";
}

export function firstValidationMessage(error: z.ZodError) {
  const issue = error.issues[0];
  if (!issue) return "Please check the form and try again.";
  if (/discriminator/i.test(issue.message)) {
    return "Invalid request. Please try again.";
  }
  return issue.message;
}

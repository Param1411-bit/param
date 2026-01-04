import { z } from 'zod';

// Hero/Profile validation schema
export const heroSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  summary: z.string().max(2000, "Summary must be less than 2000 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(30, "Phone must be less than 30 characters"),
  github: z.string().url("Invalid GitHub URL").max(500, "URL must be less than 500 characters").or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").max(500, "URL must be less than 500 characters").or(z.literal("")),
  specialties: z.array(z.string().max(50, "Specialty must be less than 50 characters")).max(20, "Maximum 20 specialties allowed").optional(),
});

// Experience validation schema
export const experienceSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  company: z.string().min(1, "Company is required").max(200, "Company must be less than 200 characters"),
  period: z.string().max(100, "Period must be less than 100 characters"),
  achievements: z.array(z.string().max(500, "Achievement must be less than 500 characters")).max(20, "Maximum 20 achievements allowed"),
});

export const experiencesSchema = z.array(experienceSchema).max(50, "Maximum 50 experiences allowed");

// Responsibility validation schema
export const responsibilitySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  period: z.string().max(100, "Period must be less than 100 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters"),
});

export const responsibilitiesSchema = z.array(responsibilitySchema).max(50, "Maximum 50 responsibilities allowed");

// Education validation schema
export const educationItemSchema = z.object({
  degree: z.string().min(1, "Degree is required").max(200, "Degree must be less than 200 characters"),
  institution: z.string().min(1, "Institution is required").max(200, "Institution must be less than 200 characters"),
  period: z.string().max(100, "Period must be less than 100 characters"),
  coursework: z.array(z.string().max(100, "Coursework item must be less than 100 characters")).max(30, "Maximum 30 coursework items allowed").optional(),
  grade: z.string().max(50, "Grade must be less than 50 characters").optional(),
});

export const educationSchema = z.array(educationItemSchema).max(20, "Maximum 20 education entries allowed");

// Project validation schema
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  period: z.string().max(100, "Period must be less than 100 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters"),
  achievements: z.array(z.string().max(500, "Achievement must be less than 500 characters")).max(20, "Maximum 20 achievements allowed"),
  tags: z.array(z.string().max(50, "Tag must be less than 50 characters")).max(20, "Maximum 20 tags allowed"),
});

export const projectsSchema = z.array(projectSchema).max(50, "Maximum 50 projects allowed");

// Skills validation schema
export const skillsSchema = z.object({
  software: z.array(z.string().max(100, "Skill must be less than 100 characters")).max(50, "Maximum 50 skills allowed"),
  hardware: z.array(z.string().max(100, "Skill must be less than 100 characters")).max(50, "Maximum 50 skills allowed"),
  domains: z.array(z.string().max(100, "Domain must be less than 100 characters")).max(50, "Maximum 50 domains allowed"),
  programming: z.array(z.string().max(100, "Language must be less than 100 characters")).max(50, "Maximum 50 languages allowed"),
});

// Contact validation schema
export const contactSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().max(30, "Phone must be less than 30 characters"),
  github: z.string().url("Invalid GitHub URL").max(500, "URL must be less than 500 characters").or(z.literal("")),
  linkedin: z.string().url("Invalid LinkedIn URL").max(500, "URL must be less than 500 characters").or(z.literal("")),
  location: z.string().max(200, "Location must be less than 200 characters"),
});

// Get the appropriate schema for a given key
export function getSchemaForKey(key: string): z.ZodSchema | null {
  switch (key) {
    case 'hero':
      return heroSchema;
    case 'experiences':
      return experiencesSchema;
    case 'responsibilities':
      return responsibilitiesSchema;
    case 'education':
      return educationSchema;
    case 'projects':
      return projectsSchema;
    case 'skills':
      return skillsSchema;
    case 'contact':
      return contactSchema;
    default:
      return null;
  }
}

// Validate data for a given key
export function validateData(key: string, value: unknown): { success: boolean; error?: string } {
  const schema = getSchemaForKey(key);
  if (!schema) {
    return { success: true }; // No schema, allow through
  }

  const result = schema.safeParse(value);
  if (result.success) {
    return { success: true };
  }

  // Get first error message
  const firstError = result.error.errors[0];
  return {
    success: false,
    error: firstError?.message || 'Validation failed',
  };
}

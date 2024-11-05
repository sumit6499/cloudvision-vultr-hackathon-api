import {z} from 'zod'

export const DiagramSchema = z.object({
    diagram_id: z.number().optional(),
    user_id: z.number(),
    upload_timestamp: z.date().optional(),
    file_path: z.string().url("Invalid file path URL"),
    status: z.enum(["processing", "completed", "error"]).default("processing"),
    extracted_at: z.date().optional(),
});

export type DiagramSchemaType=z.infer<typeof DiagramSchema>


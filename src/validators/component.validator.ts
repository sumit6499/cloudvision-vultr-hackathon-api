import {z} from 'zod'

export const ComponentSchema = z.object({
    component_id: z.number().optional(),
    diagram_id: z.number(),
    service_name: z.string().min(1, "Service name is required").max(100),
    provider: z.string().optional(),
    configuration: z.record(z.string(), z.any()).optional(), // JSONB equivalent
    created_at: z.date().optional(),
});
  
export type ComponentSchemaType=z.infer<typeof ComponentSchema>
import {z} from 'zod'

export const CostEstimateSchema = z.object({
    cost_id: z.number().optional(),
    component_id: z.number(),
    estimated_cost: z.number().min(0, "Cost cannot be negative"),
    currency: z.string().min(1).max(10).default("RS"),
    last_calculated: z.date().optional(),
});

export type CostEstimateSchemaType=z.infer<typeof CostEstimateSchema>
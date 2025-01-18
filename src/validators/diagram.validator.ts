import {z} from 'zod'
import {Diagrams} from '../models/schema'

const diagramObj=new Diagrams()

export const DiagramSchema = z.object({
    diagramObj: z.number().optional(),
    userID: z.string({message:"user id not found"}),
    uploadedAt: z.date().optional(),
    url: z.string().url("Invalid file path URL"),
    status: z.enum(["processing", "completed", "error"]).default("processing"),
});

export type DiagramSchemaType=z.infer<typeof DiagramSchema>


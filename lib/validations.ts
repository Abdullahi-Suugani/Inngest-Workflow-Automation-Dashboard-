import {z} from "zod";
export const sleepSchema=z.object({name:z.string().min(2),message:z.string().min(1),delay:z.coerce.number().min(1).max(60),unit:z.enum(["seconds","minutes"])});
export const approvalSchema=z.object({title:z.string().min(2),description:z.string().min(1),requester:z.string().min(2),deadline:z.coerce.number().min(1).max(72)});
export const deploymentSchema=z.object({service:z.string().min(2),version:z.string().min(1),requester:z.string().min(2)});

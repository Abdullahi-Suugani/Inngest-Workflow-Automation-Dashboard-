import { promises as fs } from "fs"; import path from "path"; import type {Workflow,WorkflowStatus} from "./types";
const file=path.join(process.cwd(),".data","workflows.json");
async function read():Promise<Workflow[]>{try{return JSON.parse(await fs.readFile(file,"utf8"))}catch{return []}}
async function write(items:Workflow[]){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(items,null,2));}
export async function list(){return read()}
export async function get(id:string){return (await read()).find(x=>x.id===id)}
export async function save(item:Workflow){const all=await read();const i=all.findIndex(x=>x.id===item.id);if(i>=0)all[i]=item;else all.unshift(item);await write(all);return item}
export async function update(id:string,status:WorkflowStatus,result?:string){const item=await get(id);if(!item)throw new Error("Workflow not found");item.status=status;item.updatedAt=new Date().toISOString();if(result)item.result=result;await save(item);return item}

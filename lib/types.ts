export type WorkflowStatus="pending"|"running"|"sleeping"|"waiting"|"approved"|"rejected"|"completed"|"failed"|"expired";
export type WorkflowKind="sleep"|"approval"|"deployment";
export type Step={id:string;label:string;detail?:string;status:"pending"|"running"|"done"|"failed";time?:string};
export type Workflow={id:string;name:string;kind:WorkflowKind;status:WorkflowStatus;createdAt:string;updatedAt:string;meta:Record<string, string|number>;steps:Step[];result?:string;deadline?:string};

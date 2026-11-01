import { inngest } from "./client";
export const sleepWorkflow = inngest.createFunction(
  { id: "sleep-workflow" },
  { event: "workflow/sleep.requested" },
  async ({ event, step }) => {
    await step.run("mark-started", async () => event.data);
    await step.sleep(
      "wait-before-notification",
      `${event.data.delay}${event.data.unit === "minutes" ? "m" : "s"}`,
    );
    return step.run("complete", async () => ({ message: event.data.message }));
  },
);
export const approvalWorkflow = inngest.createFunction(
  { id: "approval-workflow" },
  { event: "workflow/approval.requested" },
  async ({ event, step }) => {
    const response = await step.waitForEvent("wait-for-approval", {
      event: "workflow/approval.responded",
      match: "data.requestId",
      timeout: `${event.data.deadline}h`,
    });
    return step.run(
      "record-decision",
      async () => response?.data?.decision || "expired",
    );
  },
);
export const deploymentWorkflow = inngest.createFunction(
  { id: "deployment-workflow" },
  { event: "workflow/deployment.requested" },
  async ({ event, step }) => {
    await step.run("validate-request", async () => event.data);
    await step.sleep("security-check-delay", "10s");
    await step.run("security-check", async () => ({ ok: true }));
    const approval = await step.waitForEvent("manager-approval", {
      event: "workflow/approval.responded",
      match: "data.requestId",
      timeout: "24h",
    });
    if (approval?.data?.decision !== "approved") return "rejected";
    await step.run("deploy", async () => true);
    await step.sleep("deployment-completion", "5s");
    return step.run("notify-success", async () => "completed");
  },
);

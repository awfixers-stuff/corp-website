export const KillNonBun = async () => ({
  "tool.execute.before": async (input, output) => {
    // Only intercept bash / shell executions
    if (input.tool !== "bash" && input.tool !== "execute") {
      return;
    }

    const command = output.args?.command;
    if (typeof command !== "string" || command.trim() === "") {
      return;
    }

    const cmd = command.trim();

    // === BLOCK LIST - Precise and safe ===
    const blocks = [
      {
        name: "build-dev-serve",
        regex: /\b(build|dev|start|serve)\b/i,
        message: (c) => `Blocked: "${c}" — build/dev/start/serve commands are not allowed.`
      },
      {
        name: "non-bun-package-manager",
        regex: /\b(npm|pnpm|yarn|node|ts-node)\b/i,
        allowIf: /\bbun\b/i,
        message: (c) => `Blocked: "${c}" — only Bun is allowed (no npm/pnpm/yarn/node/ts-node).`
      },
      {
        name: "dangerous-rm",
        regex: /\brm\s+-[rR][fF]?\s*\/|rm\s+-rf\s+\//i,
        message: (c) => `Blocked: Dangerous rm command: "${c}".`
      },
      // Add more blocks here in the future
    ];

    for (const block of blocks) {
      if (block.regex.test(cmd)) {
        // Check for allowed exception
        if (block.allowIf && block.allowIf.test(cmd)) {
          continue;
        }

        const errorMsg = typeof block.message === "function"
          ? block.message(cmd)
          : block.message;

        throw new Error(errorMsg);
      }
    }

    // Command is allowed
  }
});

import { exec } from "child_process";

export const execCommand = (command: string) => {
    return new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve({ stdout, stderr });
      });
    });
  };
  
const cron = require("cron");
const { exec } = require("child_process");

const job = new cron.CronJob("0 0 * * 0", () => {
  console.log("Running weekly data update...");
  exec("npm run fetch-data", (err: any, stdout: any, stderr: any) => {
    if (err) {
      console.error(`Error updating data: ${err}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
});

job.start();

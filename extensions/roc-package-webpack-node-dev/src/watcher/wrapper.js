/*
* Used in development to init the runtime.
*
* Otherwise it is expected that the user starts the Roc application using `start` or manually
* includes the runtime.
*/
import { runCli, appendSettings } from 'roc';
import { initRuntime } from 'roc-plugin-start';

// A smart "hax" to make the process have access to the same things as the master process.
// Basically we rebuild the configuration object that was defined in the master process.
// For this to work it's important that the config is not changed during runtime.
runCli({
    argv: JSON.parse(process.env.ROC_INITAL_ARGV),
    invoke: false,
});

appendSettings({ build: { mode: JSON.parse(process.env.ROC_INITAL_BUILD_MODE) } });

initRuntime();
require(process.env.ROC_NODE_DEV_ENTRY);

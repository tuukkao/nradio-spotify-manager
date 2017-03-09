const childProcess = require('child_process');

childProcess.spawnSync('npm', ['start'], { cwd: 'frontend', shell: true, stdio: 'inherit' });

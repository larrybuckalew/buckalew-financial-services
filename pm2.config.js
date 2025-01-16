module.exports = {
  apps: [{
    name: 'buckalew-financial',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 80
    },
    instances: 'max',
    exec_mode: 'cluster'
  }]
};
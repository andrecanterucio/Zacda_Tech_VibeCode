module.exports = {
  apps: [
    {
      name: 'zacda-web',
      script: 'server.js',
      cwd: '/var/www/zacda',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
      },
    },
  ],
}

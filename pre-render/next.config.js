const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,

//   env:{
//     db_username:'admin',
//     db_password:'123456'
//   }
// }

// nextConfig 不只是一个对象 可以是一个函数。这样就可以在里面写判断了
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,

      env: {
        db_username: 'admin',
        db_password: '123456',
        db:'test'
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,

    env: {
      db_username: 'admin',
      db_password: '123456',
      db:'production'
    },
  };
};

module.exports = nextConfig;

const withImages = require('next-images');
const path = require('path');

module.exports = Object.assign(
  {
    sassOptions: {
      includePaths: [path.join(__dirname, 'src/styles')]
    }
  },
  {
    trailingSlash: true
  },
  withImages(),
  {
    publicRuntimeConfig: {
      backendUrl: process.env.NEXT_PUBLIC_API_URL
    }
  },
  {
    transpilePackages: [
      '@fullcalendar/common',
      '@fullcalendar/react',
      '@fullcalendar/daygrid',
      '@fullcalendar/list',
      '@fullcalendar/timegrid'
    ]
  }
);

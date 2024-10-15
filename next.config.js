/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['drive.google.com'],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com',
              port: '',
              pathname: '/*/**',
            },
          ],

    }
};

module.exports = nextConfig;

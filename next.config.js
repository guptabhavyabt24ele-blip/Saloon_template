const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.images.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' }
    ]
  }
};

module.exports = nextConfig;

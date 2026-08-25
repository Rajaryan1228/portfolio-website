/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from these external domains (stats widgets)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "github-readme-streak-stats.herokuapp.com",
      },
      {
        protocol: "https",
        hostname: "leetcard.jacoblin.cool",
      },
    ],
  },

  // Required for React Three Fiber / Three.js in Next.js
  transpilePackages: ["three"],

  // Webpack: allow GLSL shader files if you ever add them
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: "raw-loader",
      exclude: /node_modules/,
    });
    return config;
  },
};

module.exports = nextConfig;

const {BASE_PATH_GEONAMES_API, BASE_PATH_WEATHER_API, WEATHER_API_KEY} = process.env

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'openweathermap.org',
        }]
    },
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    rewrites: async () => {
        return [
            {
                source: '/api-geonames/:path*',
                destination: `${BASE_PATH_GEONAMES_API}/:path*`,
            },
            {
                source: '/api-weather/:path*',
                destination: `${BASE_PATH_WEATHER_API}/:path*`,
            },
        ];
    }
};

export default nextConfig;

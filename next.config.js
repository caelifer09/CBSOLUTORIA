/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DBHOST: process.env.DB_HOST,
    }
}

module.exports = nextConfig

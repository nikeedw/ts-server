import dotenv from 'dotenv'

dotenv.config()

export const EnvConfigs = {
    PORT: process.env.PORT || '8100',

    // FIREBASE_WEB_API_KEY: process.env.FIREBASE_WEB_API_KEY ?? 'unknown',
    // FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? 'unknown',
    // FIREBASE_DB_URL: process.env.FIREBASE_DB_URL ?? 'unknown',

    JWT_SECRET: process.env.JWT_SECRET || '',
    TOKEN_SALT: Number(process.env.TOKEN_SALT) || 1,
    HASURA_ADMIN_SECRET: process.env.HASURA_ADMIN_SECRET || ''
}

if (!EnvConfigs.PORT) {
    const not_set_keys = getKeys(EnvConfigs).filter((key) => !EnvConfigs[key])
    console.error(`${not_set_keys.join(',')} is not set`, 'keys which are not set: ', not_set_keys)
    process.exit(1)
}

function getKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[]
}

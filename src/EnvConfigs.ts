import dotenv from 'dotenv'

dotenv.config()

export const EnvConfigs = {
    PORT: process.env.PORT ?? '5000'
}

if (
    !EnvConfigs.PORT
) {
    const not_set_keys = getKeys(EnvConfigs).filter((key) => !EnvConfigs[key])
    console.error(`${not_set_keys.join(',')} is not set`, 'keys which are not set: ', not_set_keys)
    process.exit(1)
}

function getKeys<T extends object>(obj: T) {
    return Object.keys(obj) as (keyof T)[]
}

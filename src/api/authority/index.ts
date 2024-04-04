import axios from 'axios'
import type { Authority } from './AuthorityModel'

const getAuthority = async (): Promise<Authority[]> => {
    const data: Authority[] = []
    await axios
        .get('/api/authority/get')
        .then((solution) => {
            data.push(...solution.data)
        })
        .catch((err) => {
            throw err
        })
    // console.log('调用api')
    // console.log(data)
    return data
}

export { getAuthority }

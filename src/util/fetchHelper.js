import qs from 'qs';
import axios from 'axios'

export default {
    async loginHelp(form) {
        let config_urlencode = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        // console.log(qs.stringify(form));
        return axios
            .post(`${process.env.VUE_APP_API_URL}/api/login`, qs.stringify(form), config_urlencode)
            .then(res => res)
            .catch(e => e); //eslint-disable-line no-console

    },
    async userInfoHelp(jwt) {
        let info;
        if (jwt != null) {
            info = await axios
                .get(`${process.env.VUE_APP_API_URL}/api/v0/users`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                })
                .then(res => res)
                .catch(e => e);//eslint-disable
        }
        return info;

    },
    async memInfoHelp(currMemberId) {
        return axios
            .get(`${process.env.VUE_APP_API_URL}/api/v0/members/${currMemberId}`)
            .then(res => res)
            .catch(e => e);//eslint-disable

    },
    async registerHelp(form) {
        let config_urlencode = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        // console.log(qs.stringify(form));
        return axios
            .post(`${process.env.VUE_APP_API_URL}/api/v0/users`, form)
            .then(res => res)
            .catch(e => e); //eslint-disable-line no-console
    }

}
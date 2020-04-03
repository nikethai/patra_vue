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
    async memInfoHelp(currMemberId, jwt) {
        let info;
        let config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        if (jwt != null) {
            info = await axios
                .get(`${process.env.VUE_APP_API_URL}/api/v0/members/${currMemberId}`, config)
                .then(res => res)
                .catch(e => e);//eslint-disable
        }
        return info

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
    },
    async assignHelper(taskId, selectedMem) {
        let selectedMemID = [];
        let config = {};
        let jwt = localStorage.getItem("jwt");
        if (taskId != null && selectedMem != null && jwt != null) {
            config = {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            }
            selectedMemID = selectedMem.map(x => x.memberId);
            let params = {
                memberIds: [...selectedMemID]
            };
            let stringParam = qs.stringify(params, { arrayFormat: 'repeat' });
            return axios
                .patch(`${process.env.VUE_APP_API_URL}/api/v0/tasks/${taskId}/assignees?${stringParam}`, null, config)
                .then(res => res)
                .catch(e => e);//eslint-disable

        }
    },
    async commentHelp(taskId, comment, username,jwt) {
        let data = {
            comment: comment,
            username: username
        }
        let config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios
            .post(`${process.env.VUE_APP_API_URL}/api/v0/tasks/${taskId}/comments`, data,config)
            .then(res => res)
            .catch(e => e);//eslint-disable

    },
    async getUserOrgHelp(username, jwt) {
        let config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios
            .get(`${process.env.VUE_APP_API_URL}/api/v0/users/${username}/organizations`,config)
            .then(res => res)
            .catch(e => e);//eslint-disable

    },
    async getAllOrgHelp(jwt) {
        let config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios
            .get(`${process.env.VUE_APP_API_URL}/api/v0/organizations/all`,config)
            .then(res => res)
            .catch(e => e);//eslint-disable

    },
    async deleteTaskHelp(taskId,jwt) {
        let config = {
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        }
        return axios
            .delete(`${process.env.VUE_APP_API_URL}/api/v0/tasks/${taskId}`,config)
            .then(res => res)
            .catch(e => e);//eslint-disable

    },
}
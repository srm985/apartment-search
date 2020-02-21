const axios = require('axios').default;

const baseURL = 'https://www.apartments.com/services/geography/search/';

axios.post({
    data: {
        l: [
            null,
            null
        ],
        t: 'chicago'
    },
    method: 'post',
    url: baseURL
}).then((response) => {
    const {
        data
    } = response;

    console.log(data);
}).catch(() => {
    console.log('error...');
});

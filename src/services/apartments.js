const axios = require('axios').default;

const apartments = {
    requestCookies: () => new Promise((resolve) => {
        axios.get('https://www.apartments.com/chicago-il/').then((response) => {
            console.log(response.headers);
            resolve([
                ...response.headers['set-cookie']
            ]);
        }).catch(() => {
            resolve([]);
        });
    }),
    searchAll: async () => {
        // const cookieList = await apartments.requestCookies();

        // console.log({
        //     cookieList
        // });

        axios({
            data: {
                Geography: {
                    Address: {
                        City: 'Chicago',
                        DMA: 'Chicago, IL-IN',
                        MarketName: 'Chicago',
                        State: 'IL'
                    },
                    BoundingBox: {
                        LowerRight: {
                            Latitude: 41.64429,
                            Longitude: -87.52404
                        },
                        UpperLeft: {
                            Latitude: 42.02314,
                            Longitude: -87.9401
                        }
                    },
                    Display: 'Chicago, IL',
                    GeographyType: 2,
                    ID: 'p6w41jt',
                    Location: {
                        Latitude: 41.83371,
                        Longitude: -87.73207
                    },
                    v: 26543
                },
                IsBoundedSearch: null,
                Listing: {},
                Map: {
                    BoundingBox: {
                        LowerRight: {
                            Latitude: 41.64429,
                            Longitude: -87.52404
                        },
                        UpperLeft: {
                            Latitude: 42.02314,
                            Longitude: -87.9401
                        }
                    },
                    Shape: null
                },
                Options: 1,
                Paging: {
                    Page: null
                },
                ResultSeed: 281412,
                Transportation: null
            },
            method: 'post',
            url: 'https://www.apartments.com/services/search/'
        }).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
};

export default apartments;

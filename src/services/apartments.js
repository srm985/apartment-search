import axios from 'axios';
import {
    parse
} from 'node-html-parser';

import decodeURLList from '../utils/decodeURLList';

const resultSeed = Math.floor(Math.random() * 900000) + 100000;

const apartments = {
    getApartmentDetails: (apartmentURLList) => new Promise((resolve) => {
        const parseDetails = (webpageString) => {
            const webpage = parse(webpageString);

            const amenities = webpage.querySelectorAll('#amenitiesSection .specList').map((amenitySection) => amenitySection.toString());
            const description = webpage.querySelector('#descriptionSection p').toString();

            return ({
                amenities,
                description
            });
        };

        console.log(`calling ${apartmentURLList[0]}...`);

        axios.get(apartmentURLList[0]).then((response) => {
            const {
                data
            } = response;

            const parsedDetails = parseDetails(data);

            resolve(parsedDetails);
        }).catch(() => {
            resolve({});
        });
    }),

    retrievePinDetails: async (listingKey) => {
        axios({
            data: {
                ListingKeys: [
                    listingKey
                ]
            },
            method: 'post',
            url: 'https://www.apartments.com/services/property/infoCardData'
        }).then((response) => {
            const {
                data: {
                    PropertyUrl: propertyURL
                } = {}
            } = response;

            return ({
                propertyURL
            });
        }).catch(() => {
            console.log('failed to retrieve pin details...');
        });
    },

    searchAll: async () => new Promise((resolve) => {
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
                ResultSeed: resultSeed,
                Transportation: null
            },
            method: 'post',
            url: 'https://www.apartments.com/services/search/'
        }).then((response) => {
            const {
                data: {
                    PinsState: {
                        cl: encodedApartmentPins,
                        TotalUnitCount: totalApartmentCount
                    } = {},
                    PlacardState: {
                        HTML: apartmentCards = ''
                    } = {}
                } = {}
            } = response;

            const decodedURLs = decodeURLList(apartmentCards);

            resolve({
                decodedURLs,
                encodedApartmentPins,
                totalApartmentCount
            });
        }).catch((error) => {
            console.log(error);
        });
    })
};

export default apartments;

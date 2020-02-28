const decodedURLList = (apartmentCardList) => apartmentCardList.match(/data-url=.*\/"/g)
    .map((apartmentURL) => {
        const {
            1: extractedApartmentURL
        } = apartmentURL.split('=');

        return extractedApartmentURL.replace(/"/g, '');
    });

export default decodedURLList;

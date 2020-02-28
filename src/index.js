import apartments from './services/apartments';

const findApartments = async () => {
    const {
        decodedURLs = []
    } = await apartments.searchAll();

    const apartmentPosting = await apartments.getApartmentDetails(decodedURLs);

    console.log(apartmentPosting);
};

findApartments();

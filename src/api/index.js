import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let chngableUrl = url;

    if(country){
        chngableUrl = `${url}/countries/${country}`
    }

    try {
        const { data } = await axios.get(chngableUrl);
        
        const modifiedData = {
            confirmed: data.confirmed,
            recovered: data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData;
    
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get( `${url}/daily` );
        // console.log(data);
        const modifiedData = data.map((dailyData) =>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate  
        }));
        // console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${url}/countries/`);
        return countries.map(country => country.name);
        console.log(countries);
    } catch (error) {
        console.log(error);
    }
}
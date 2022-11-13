import axios from "axios";

const url = process.env.REACT_APP_VITAL_TRACKER_API;

export const fetchBpData = async () => {
    try{
        const { data } = await axios.get(`${url}/vitals`, {
          headers: {
            Authorization:
              'Bearer ' + process.env.REACT_APP_API_TOKEN
          }
        });
  
        const modifiedData = data.data.map((dailyData) => ({
            systolic: dailyData.attributes.systolic,
            diastolic: dailyData.attributes.diastolic,
            heartrate: dailyData.attributes.heartrate,
            weight: dailyData.attributes.weight,
            date: dailyData.attributes.createdDateTime
        }))
        return modifiedData;
    } catch(err){
        console.log(err)
    }
}
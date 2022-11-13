import axios from "axios";
import {} from 'dotenv/config'

const url = process.env.VITAL_TRACKER_API || "http://localhost:1337/api";

export const fetchBpData = async () => {
    try{
        const { data } = await axios.get(`${url}/vitals`, {
          headers: {
            Authorization:
              'Bearer e0efbd163867d1c14f389fb91458fe6b5b71079a20d8ae6843fe32918e56b0666ed4c350631e784c72f619929c4fbabd41c7e22464ad2da05d28cd9f4ceea8aa55bc256b95b97b8ea8fc423c91b0538ecbec73b86991ca7602a209fbea797b3da7ba25cc07fbfb0e2c470d9ba66eab4e5487554bbc7ebcc202efaff8debd95a1'
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
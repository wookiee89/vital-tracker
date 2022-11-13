// ./components/BarChart.js

import React, { useEffect, useState } from "react";
import { fetchBpData } from "./Data";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";


const BarChart = () => {
    const [dailyData, setDailyData] = useState([]);
  
    const fetchApi = async () => {
      const dailyData = await fetchBpData();
      setDailyData(dailyData);
    };
  
    useEffect(() => {
      fetchApi();
    }, []);
  
    const barChart = dailyData[0] ? (
      <Bar
        data={{
          labels: dailyData.map(({ date }) =>
            new Date(date).toLocaleDateString()
          ),
          datasets: [
            {
              type: 'bar',
              data: dailyData.map((data) => {
                return [data.systolic, data.diastolic];
              }),
              label: "Blood Pressure",
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              order: 2
            },
            {
              type: 'line',
              label: 'Heart Rate',
              borderColor: 'rgb(54, 162, 235)',
              data: dailyData.map((data) => {
                return data.heartrate;
              }),
              order: 1
            }
          ],
        }}
      />
    ) : null;
  
    return (
      <>
        <div>{barChart}</div>
      </>
    );
  };


export default BarChart;
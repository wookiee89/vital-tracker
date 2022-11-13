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
              borderColor: 'rgb(153, 102, 255)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderWidth: 1,
              borderSkipped: false,
              order: 2
            },
            {
              type: 'line',
              label: 'Heart Rate',
              borderColor: 'rgb(75, 192, 192)',
              data: dailyData.map((data) => {
                return data.heartrate;
              }),
              tension: 0.5,
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
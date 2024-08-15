import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  const options = {
    scales: {
      x: {
        ticks: {
          color: "#fff", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#fff", // Y-axis label color
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    // Ensure the chart scales properly
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;

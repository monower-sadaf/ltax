'use client'
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'ভূমি উন্নয়ন কর প্রদান তথ্যাবলী',
              data: data.values,
              backgroundColor: 'rgba(1, 162, 50, 1)', // Set the bar color
              borderColor: 'rgba(0, 177, 50, 1)', // Set the border color
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          animation: {
            animateScale: true,  // Animate the scaling of the bars.
            animateRotate: true  // Animate the rotation of the bars (for horizontal bars).
          }
        },
      });
      return () => {
        newChart.destroy(); // Destroy the chart instance when the component unmounts
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;

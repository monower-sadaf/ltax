'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { en2bn } from '@/halpers/helper';

const DonutChart = ({ data }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    if (chartRef.current) {
      const newChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: [
                'rgba(18,99,61,1)',
                '#cbd5e1'
              ],
              borderColor: 'rgba(255, 255, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          // cutout: '69.8%',
          // Animation configuration
          animation: {
            animateRotate: true,  // Animate the rotation of the chart.
            animateScale: true   // Animate the scaling of the chart.
          },
           // Tooltip configuration
          plugins: {
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0,0,0,0.7)',  // Background color of tooltips.
                titleFontColor: 'white',  // Font color of tooltip title.
                bodyFontColor: 'white',  // Font color of tooltip body.
                titleFontSize: 14,
                bodyFontSize: 12,
                displayColors: true,  // Whether to display color boxes in tooltips.
                callbacks: {
                    label: function(context) {
                        return ` ${en2bn((context?.parsed).toFixed(2))} %`;  // Customize tooltip labels.
                    }
                }
            }
          },
        },
      });
      return () => {
        newChart.destroy(); // Destroy the chart instance when the component unmounts
      };
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DonutChart;

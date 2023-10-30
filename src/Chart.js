import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React, { useMemo, useState, useRef, useCallback } from 'react';
import GraphTooltip from './CustomToolTip';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function Chart() {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState(null);
    const [tooltipPos, setTooltipPos] = useState(null);
  
    const chartRef = useRef(null);
    const customTooltip = useCallback((context) => {
        if (context.tooltip.opacity == 0) {
          // hide tooltip visibilty
          setTooltipVisible(false);
          return;
        }
    
        const chart = chartRef.current;
        const canvas = chart.canvas;
        if (canvas) {
          // enable tooltip visibilty
          setTooltipVisible(true);
    
          // set position of tooltip
          const left = context.tooltip.x;
          const top = context.tooltip.y;
    
          // handle tooltip multiple rerender
          if (tooltipPos?.top != top) {
            setTooltipPos({ top: top, left: left });
            setTooltipData(context.tooltip);
          }
        }
      });
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
          
          tooltip: {
              enabled: false,
              position: 'nearest',
              external: customTooltip,
            },
        },
        
      };
  return <>
  <Bar options={options} data={data} ref={chartRef}/>
  {tooltipPos && (
        <GraphTooltip
          data={tooltipData}
          position={tooltipPos}
          visibility={tooltipVisible}
        />
      )}
  </>;
}

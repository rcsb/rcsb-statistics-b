import React from 'react';
import BasicChart from '../../components/BasicChart/BasicChart';
import experimentalMethodsData from './experimentalMethodsData'


const DataDistribution: React.FC = () => {
  const rawData = experimentalMethodsData

  // Transform rawData into the format that Chart.js expects
  const chartData = {
    labels: rawData[0].map((item: any) => item.label), // Assume all datasets share the same labels
    datasets: rawData.map((dataset: any[], index: number) => ({
      label: dataset[0].objectConfig.objectId[1], // Was Using the "X-ray", "Multiple methods", etc. as labels
      data: dataset.map(item => item.population),
      backgroundColor: dataset[0].objectConfig.color,
      borderColor: dataset[0].objectConfig.color,
      borderWidth: 1,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          boxWidth: 40,
          padding: 20,
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            style: 'normal',
          },
          color: '#333',
          usePointStyle: false,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 12,
        },
        padding: 10,
        displayColors: true,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem: { dataset: { label: string }, raw: any }) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
          title: function (tooltipItems: { label: string }[]) {
            return `Year: ${tooltipItems[0].label}`;
          },
          footer: function () {
            return 'Additional information';
          },
        },
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        display: true,
        stacked: true,
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0,
          font: {
            size: 12,
          },
          color: '#333',
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: 14,
            weight: 'normal',
          },
          color: '#333',
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        stacked: true,
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          color: '#e4e4e4',
        },
        ticks: {
          stepSize: 1000,
          font: {
            size: 12,
          },
          color: '#333',
          callback: (value: number | string) => `${value}`,
        },
        title: {
          display: true,
          text: 'Number of Entries',
          font: {
            size: 11,
            weight: 'normal',
          },
          color: '#333',
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 4,
        hoverBackgroundColor: 'rgba(0,0,0,0.2)',
        hoverBorderColor: '#333',
      },
    },
    animation: {
      duration: 500,
      easing: 'easeInOutQuart',
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 10,
      },
    },
  };
  
  return (
    <article className="col-12">
      <h4>PDB Data Distribution by Natural Source Organism</h4>

      <div>
        <BasicChart data={chartData} options={chartOptions} />
      </div>
    </article>
  );
};

export default DataDistribution;

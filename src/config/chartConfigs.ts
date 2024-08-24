import { ChartOptions  } from 'chart.js';

export const experimentalMethodChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'PDB Data Distribution by Experimental Method',
            font: {
                size: 18,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                weight: 'bold',
            },
            color: '#333',
            padding: {
                top: 0,
                bottom: 40,
            },
            align: 'start',
        },
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
            mode: 'index',
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
                label: function (tooltipItem) {
                    if (tooltipItem.raw === 0) {
                        return ''; 
                    }
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
                title: function (tooltipItems) {
                    return `Year: ${tooltipItems[0].label}`;
                },
                footer: function (tooltipItems) {
                    if (tooltipItems.length > 1) {
                        const total = tooltipItems.reduce((sum, tooltipItem) => {
                            return sum + Number(tooltipItem.raw);
                        }, 0);
                        return `Total: ${total}`;
                    }
                    return '';
                },
            },
        },
        filler: {
            propagate: true,
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: 'x',
            },
        },
    },
    scales: {
        x: {
            type: 'category',
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
            type: 'linear',
            display: true,
            stacked: true,
            beginAtZero: true,
            grid: {
                display: true,
                color: '#e4e4e4',
                lineWidth: 1,
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
            borderRadius: 2,
            hoverBackgroundColor: 'rgba(0,0,0,0.2)',
            hoverBorderColor: '#333',
        },
    },
    animation: {
        duration: 600,
        easing: 'easeInOutQuart',
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    },
};

export const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'PDB Data Distribution by Experimental Method',
            font: {
                size: 18,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                weight: 'bold',
            },
            color: '#333',
            padding: {
                top: 0,
                bottom: 40,
            },
            align: 'start',
        },
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
            mode: 'index',
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
                label: function (tooltipItem) {
                    if (tooltipItem.raw === 0) {
                        return ''; 
                    }
                    return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
                title: function (tooltipItems) {
                    return `Year: ${tooltipItems[0].label}`;
                },
                footer: function (tooltipItems) {
                    if (tooltipItems.length > 1) {
                        const total = tooltipItems.reduce((sum, tooltipItem) => {
                            return sum + Number(tooltipItem.raw);
                        }, 0);
                        return `Total: ${total}`;
                    }
                    return '';
                },
            },
        },
        filler: {
            propagate: true,
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: 'x',
            },
        },
    },
    scales: {
        x: {
            type: 'category',
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
            type: 'linear',
            display: true,
            stacked: true,
            beginAtZero: true,
            grid: {
                display: true,
                color: '#e4e4e4',
                lineWidth: 1,
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
            borderRadius: 2,
            hoverBackgroundColor: 'rgba(0,0,0,0.2)',
            hoverBorderColor: '#333',
        },
    },
    animation: {
        duration: 600,
        easing: 'easeInOutQuart',
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
    },
};


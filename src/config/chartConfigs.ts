import { ChartOptions } from 'chart.js';

const baseChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
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

const chartOptions: Record<string, ChartOptions<'bar'>> = {
    'overall-structures': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth of Overall Structures',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        const datasetIndex = tooltipItem.datasetIndex;
                        if (datasetIndex === 0) {
                            return `Structures Released Annually: ${tooltipItem.raw}`;
                        } else if (datasetIndex === 1) {
                            return `Entries Available: ${tooltipItem.raw}`;
                        }
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    }
                },
            },
        },
    },
    'overall-small-molecules': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth of Released Small Small Molecules',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        const datasetIndex = tooltipItem.datasetIndex;
                        if (datasetIndex === 0) {
                            return `Small Molecules Released Annually: ${tooltipItem.raw}`;
                        } else if (datasetIndex === 1) {
                            return `Small Molecules Available: ${tooltipItem.raw}`;
                        }
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                },
            },
        },
    },
    'experimental-method': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth by Experimental Method',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                    footer: function (tooltipItems: any) {
                        if (tooltipItems.length > 1) {
                            const total = tooltipItems.reduce((sum: number, tooltipItem: any) => {
                                return sum + Number(tooltipItem.raw);
                            }, 0);
                            return `Total: ${total}`;
                        }
                        return '';
                    },
                },
            },
        },
    },
    'molecular-composition': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth by Molecular Composition',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                    footer: function (tooltipItems: any) {
                        if (tooltipItems.length > 1) {
                            const total = tooltipItems.reduce((sum: number, tooltipItem: any) => {
                                return sum + Number(tooltipItem.raw);
                            }, 0);
                            return `Total: ${total}`;
                        }
                        return '';
                    },
                },
            },
        },
    },
    'assembly-symmetry': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth by Assembly Symmetry',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                    footer: function (tooltipItems: any) {
                        if (tooltipItems.length > 1) {
                            const total = tooltipItems.reduce((sum: number, tooltipItem: any) => {
                                return sum + Number(tooltipItem.raw);
                            }, 0);
                            return `Total: ${total}`;
                        }
                        return '';
                    },
                },
            },
        },
    },
    'number-of-domains': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth by Number of Domains',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                    footer: function (tooltipItems: any) {
                        if (tooltipItems.length > 1) {
                            const total = tooltipItems.reduce((sum: number, tooltipItem: any) => {
                                return sum + Number(tooltipItem.raw);
                            }, 0);
                            return `Total: ${total}`;
                        }
                        return '';
                    },
                },
            },
        },
    },
    'unique-protein-sequences': {
        ...baseChartOptions,
        plugins: {
            ...baseChartOptions.plugins,
            title: {
                ...baseChartOptions.plugins?.title,
                text: 'PDB Statistics: Growth by Unique Protein Sequences',
            },
            tooltip: {
                ...baseChartOptions.plugins?.tooltip,
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                    title: function (tooltipItems: any) {
                        return `${tooltipItems[0].label}`;
                    },
                    footer: function (tooltipItems: any) {
                        if (tooltipItems.length > 1) {
                            const total = tooltipItems.reduce((sum: number, tooltipItem: any) => {
                                return sum + Number(tooltipItem.raw);
                            }, 0);
                            return `Total: ${total}`;
                        }
                        return '';
                    },
                },
            },
        },
    },
};

export default chartOptions;

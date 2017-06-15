export const lineConfig = {
    chart: {
        type: 'line'
    },
    title: {
        text: ''
    },
    xAxis: {},
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Count'
        },
        min: 0
    },
    legend: {
        enabled: true
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        },
        pie: {
            // allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                format: '<b>{point.name}</b>: {point.y}'
            }
             
        }
    },
    series: []
}
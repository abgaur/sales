export const lineConfig = {
    chart: {
        type: 'line'
    },
    credits: {
        enabled: false
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
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            }
        },
        column: {
            dataLabels: {
                enabled: true
            }
        },
        pie: {
            cursor: 'pointer',
            dataLabels: {
                format: '<b>{point.name}</b>: {point.y}'
            }
             
        }
    },
    series: []
}
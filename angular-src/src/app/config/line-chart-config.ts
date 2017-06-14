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
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: []
}
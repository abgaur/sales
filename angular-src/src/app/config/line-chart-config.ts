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
            }
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
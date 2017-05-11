export const lineConfig = {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Weekly Calls'
    },
    subtitle: {
        text: 'Source: eTouch'
    },
    xAxis: {
        categories: ['Monday','Tuesday','Wednesday','thursday', 'Friday', 'Saturday']
    },
    yAxis: {
        title: {
            text: 'Number of Calls'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Calls',
        data: [5,4,5,3,4,6]
    }]
}
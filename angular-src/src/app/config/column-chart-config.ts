export const columnConfig = {
	chart: {
		type: 'column'
	},
	credits: { 
        enabled: false 
    },
    legend: {
        enabled: true
    },
	plotOptions: {
        column: {
            stacking: 'normal'
        }
    },
    series: [],
    title: { text: null },
    tooltip: {
    	shared: true
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45
        }
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Count'
        },
        min: 0
    }
}
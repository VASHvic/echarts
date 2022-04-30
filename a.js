let myChart = echarts.init(document.getElementById('myChart'));

function autoFontSize() {
  let width = document.getElementById('myChart').offsetWidth;
  let newFontSize = Math.round(width / 11);
  console.log(`Current width : ${width}, Updating Fontsize to ${newFontSize}`);
  return newFontSize;
}

const fruits = [
  {
    value: 100,
    name: 'Apple(s)',
  },
  {
    value: 200,
    name: 'Banana(s)',
  },
];

const sum = fruits.reduce(function (prev, current) {
  return prev + current.value;
}, 0);

let myChartOption = {
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  tooltip: {
    trigger: 'item',
    textStyle: {
      fontSize: '15',
    },
    formatter: 'You have {c} {b}',
  },
  legend: {
    orient: 'vertical',
    x: 'right',
    y: 'bottom',
    padding: 0,
    itemGap: 0,
    textStyle: {
      fontSize: '15',
    },
    formatter: function (name) {
      var targetValue = 0;
      fruits.forEach(function (c) {
        if (c.name == name) {
          targetValue = c.value;
        }
      });
      return targetValue + ' ' + name;
    },
  },
  series: [
    {
      name: 'fruits',
      type: 'pie',
      center: ['50%', '40%'],
      radius: ['50%', '60%'],
      avoidLabelOverlap: false,
      label: {
        position: 'center',
        textStyle: {
          fontSize: autoFontSize(),
          fontWeight: 'bold',
        },
        color: 'black',
        formatter: '' + sum,
      },
      labelLine: {
        normal: {
          show: false,
        },
      },
      data: fruits,
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

myChart.setOption(myChartOption);

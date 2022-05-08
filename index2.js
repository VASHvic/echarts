var dom = document.getElementById('container');
var myChart = echarts.init(dom);
// var app = {};
// const data = [["2022-04-01", 56], ["2022-04-02", 65], ["2022-04-03", 54], ["2022-04-04", 55], ["2022-04-05", 66], ["2022-04-06", 66], ["2022-04-07", 66], ["2022-04-08", 66], ["2022-04-09", 66], ["2022-04-10", 66], ["2022-04-11", 66], ["2022-04-12", 20], ["2022-04-13", 48], ["2022-04-14", 88], ["2022-04-15", 66], ["2022-04-16", 66], ["2022-04-17", 66], ["2022-04-18", 66], ["2022-04-19", 66], ["2022-04-20", 66], ["2022-04-21", 66], ["2022-04-22", 66], ["2022-04-23", 66], ["2022-04-24", 66], ["2022-04-25", 66], ["2022-04-26", 66], ["2022-04-27", 66], ["2022-04-28", 66], ["2022-04-29", 66], ["2022-04-30", 66], ["2022-05-01", 66], ["2022-05-02", 66], ["2022-05-03", 66], ["2022-05-04", 66], ["2022-05-05", 66], ["2022-05-06", 66], ["2022-05-07", 66], ["2022-05-08", 66], ["2022-05-09", 66], ["2022-05-10", 66], ["2022-05-11", 66], ["2022-05-12", 66], ["2022-05-13", 66], ["2022-05-14", 66], ["2022-05-15", 66], ["2022-05-16", 66], ["2022-05-17", 66], ["2022-05-18", 66], ["2022-05-19", 66], ["2022-05-20", 66], ["2022-05-21", 66], ["2022-05-22", 66], ["2022-05-23", 66]];
var option;

var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

$.get(ROOT_PATH + '/data/asset/data/aqi-beijing.json', function (data) {
  myChart.setOption(
    (option = {
      title: {
        text: 'Valenciaaaa Leq',
        left: '1%',
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
      },
      xAxis: {
        data: data.map(function (item) {
          date = new Date();
          return (
            date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES')
          );
        }),
      },
      yAxis: {},
      toolbox: {
        show: true,
        right: 10,
        feature: {
          dataZoom: {
            yAxisIndex: 'none',
          },
          restore: {},
          saveAsImage: {},
        },
      },
      dataZoom: [
        {
          startValue: '2014-06-01',
        },
        {
          type: 'inside',
        },
      ],
      visualMap: {
        top: 50,
        right: 10,
        pieces: [
          {
            gt: 0,
            lte: 80,
            color: '#93CE07',
          },
          {
            gt: 80,
            lte: 90,
            color: '#FBDB0F',
          },
          {
            gt: 90,
            lte: 115,
            color: '#FC7D02',
          },
          {
            gt: 115,
            lte: 140,
            color: '#FD0100',
          },
        ],
        outOfRange: {
          color: '#999',
        },
      },
      series: {
        name: 'Valencia Leq',
        type: 'line',
        data: data.map((item) => {
          // if (item[1] > 140) return item[1] === 70
          // if (item[1] < 50) return item[1] == 50
          return item[1];
        }),
        markLine: {
          silent: true,
          lineStyle: {
            color: '#333',
          },
          data: [
            {
              yAxis: 80,
            },
            {
              yAxis: 90,
            },
            {
              yAxis: 115,
            },
            // {
            //   yAxis: 200
            // },
            // {
            //   yAxis: 300
            // }
          ],
        },
      },
    })
  );
});

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

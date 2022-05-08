let urls = [];
let sensors;
let baseSearch = `https://sensors-soroll-api.herokuapp.com/getall/`;
let urlDisplayed = 0;
let data = [];

fetch('https://sensors-soroll-api.herokuapp.com/getallids')
  .then((d) => d.json())
  .then((sensorIds) => {
    urls = sensorIds.map((s) => baseSearch + s.replace('NoiseLevelObserved-HOPVLCi', ''));
    fetch(urls[urlDisplayed])
      .then((d) => d.json())
      .then((d) => {
        d.forEach((messura) => {
          let [{LAeq}] = messura.data;
          data.push([LAeq.metadata.TimeInstant.value, Math.round(LAeq.value).toString()]);
        });
        console.log(data);
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
                date = new Date(item[0]);
                return (
                  date.toLocaleDateString('es-ES') +
                  ' ' +
                  date.toLocaleTimeString('es-ES')
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
              data: data.map((item) => item[1]),
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
  });
// })
// .catch((err) => console.log(err));

let app = {};
let option;

var myChart = echarts.init(document.getElementById('container'));

option = {
  title: {
    text: '',
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
      return date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES');
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
    data: data,
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
};

if (option && typeof option === 'object') {
  myChart.setOption(option);
}

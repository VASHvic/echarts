//TODO: Mostrar el nom del carrer i posar la info dalt de tot
//mirar per qué no ordena
let urls = [];
let sensors;
let baseSearch = `https://sensors-soroll-api.herokuapp.com/getall/`;
let urlDisplayed = 0;
let dataArray = [];

// Get all posible ids on page load and push the search api route to an array
fetch('https://sensors-soroll-api.herokuapp.com/getallids')
  .then((d) => d.json())
  .then((sensorIds) => {
    urls = sensorIds.map((s) => baseSearch + s.replace('NoiseLevelObserved-HOPVLCi', ''));
    // .sort((a, b) => a - b);
    //construct the data needed for the graph with the first element of the url array
    console.log(urls[urlDisplayed]);

    fetch(urls[urlDisplayed])
      .then((d) => d.json())
      .then((d) => {
        d.forEach((messura) => {
          let [{LAeq}] = messura.data;
          //push data of messure and value to the array [[d,v], [d,v]....]
          dataArray.push([
            LAeq.metadata.TimeInstant.value,
            Math.round(LAeq.value).toString(),
          ]);
        });
        // feed the graph with data
        graph.setOption(
          (option = {
            xAxis: {
              data: dataArray.map(function (item) {
                date = new Date(item[0]);
                return (
                  date.toLocaleDateString('es-ES') +
                  ' ' +
                  date.toLocaleTimeString('es-ES')
                );
              }),
            },
            series: {
              data: dataArray.map((item) => item[1]),
            },
          })
        );
      });
  });

// initialize the graph before having data
let app = {};
let option;

var graph = echarts.init(document.getElementById('container'));

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
    data: dataArray.map(function (item) {
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
        lte: 75,
        color: '#93CE07',
      },
      {
        gt: 75,
        lte: 85,
        color: '#FBDB0F',
      },
      {
        gt: 85,
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
    data: dataArray,
    markLine: {
      silent: true,
      lineStyle: {
        color: '#333',
      },
      data: [
        {
          yAxis: 75,
        },
        {
          yAxis: 85,
        },
        {
          yAxis: 115,
        },
      ],
    },
  },
};

if (option && typeof option === 'object') {
  graph.setOption(option);
}

const container = document.querySelector('#parent');
container.addEventListener('click', () => {
  ++urlDisplayed;
  if (urlDisplayed > urls.length - 1) urlDisplayed = 0;
  console.log(urls[urlDisplayed]);
  updateData();
});

window.onresize = function () {
  let resizing = false;

  graph.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      graph.resize();
      resizing = false;
    }, 10);
  }
};
function updateData() {
  dataArray = [];
  fetch(urls[urlDisplayed])
    .then((d) => d.json())
    .then((d) => {
      d.forEach((messura) => {
        let [{LAeq}] = messura.data;
        dataArray.push([
          LAeq.metadata.TimeInstant.value,
          Math.round(LAeq.value).toString(),
        ]);
      });

      graph.setOption(
        (option = {
          xAxis: {
            data: dataArray.map(function (item) {
              date = new Date(item[0]);
              return (
                date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES')
              );
            }),
          },
          series: {
            data: dataArray.map((item) => item[1]),
          },
        })
      );
    });
}

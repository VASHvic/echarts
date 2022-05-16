let app = {};
let option;
let urls = [];
let baseSearch = `https://sensors-soroll-api.herokuapp.com/getall/`;
let urlDisplayed = 0;
let dataArray = [];
let nomCarrer = '';
const infoPointer = document.getElementById('logo-info');
// Get all posible ids on page load and push the search api route to an array
fetch('https://sensors-soroll-api.herokuapp.com/getallids')
  .then((d) => d.json())
  .then((sensorIds) => {
    const ids = sensorIds
      .map((s) => +s.replace('NoiseLevelObserved-HOPVLCi', ''))
      .sort((a, b) => a - b);
    urls = ids.map((id) => baseSearch + id);
    updateData();
  });

// initialize the graph before having data
var graph = echarts.init(document.getElementById('container'));
option = {
  title: {
    text: nomCarrer,
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
    data: [],
  },
  yAxis: {
    min: 35,
  },
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
    name: '',
    type: 'line',
    data: dataArray,
    markLine: {
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

const container = document.querySelector('#pointer');
container.addEventListener('click', (e) => {
  infoPointer.innerText = 'Carregant noves dades';
  ++urlDisplayed;
  if (urlDisplayed > urls.length - 1) urlDisplayed = 0;
  console.log(urls[urlDisplayed]);
  updateData();
});

window.onresize = function () {
  // resize the canvas, setTimeour added because the original function bugs sometimes
  let resizing = false;
  graph.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      graph.resize();
      resizing = false;
    }, 100);
  }
};
function updateData() {
  fetch(urls[urlDisplayed])
    .then((d) => d.json())
    .then((d) => {
      console.log(d);
      nomCarrer = d[0].data[0].address.value;
      dataArray = d.map((info) => info.data[0].LAeq);
      graph.setOption(
        (option = {
          title: {
            text: nomCarrer,
            left: '1%',
          },
          xAxis: {
            data: dataArray.map(function (item) {
              date = new Date(item.metadata.TimeInstant.value);
              return (
                date.toLocaleDateString('es-ES') + ' ' + date.toLocaleTimeString('es-ES')
              );
            }),
          },
          series: {
            data: dataArray.map((item) => Math.floor(item.value)),
          },
        })
      );
      infoPointer.innerText = 'Mostrar més';
    });
}

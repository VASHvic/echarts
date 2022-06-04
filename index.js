const altaveu = document.getElementById('logo-altaveu');
const canvas1 = document.getElementById('container1');
const canvas2 = document.getElementById('container2');
const infoPointer = document.getElementById('logo-info');
const container = document.querySelector('#pointer');
const info1 = document.querySelector('#titol1 > p');

let option1;
let chartUrls = [];
let baseSearch = `https://sensors-soroll-api.herokuapp.com/getall/`;
let urlDisplayed = 0;
let dataArray = [];
let nomCarrer = '';
let changeView = 0;

container.addEventListener('click', (e) => {
  if (canvas1.style.display === 'block') {
    infoPointer.innerText = 'Carregant noves dades...';
    ++urlDisplayed;
    if (urlDisplayed > chartUrls.length - 1) urlDisplayed = 0;
    updateData();
  }
});

altaveu.addEventListener('click', () => {
  canvas1.style.display === 'block'
    ? (canvas1.style.display = 'none')
    : (canvas1.style.display = 'block');
  canvas2.style.display === 'block'
    ? (canvas2.style.display = 'none')
    : (canvas2.style.display = 'block');
  if (changeView === 0) {
    const gaugeScript = document.createElement('script');
    gaugeScript.src = 'gauges.js';
    document.body.append(gaugeScript);
    changeView = 1;
  }
  if (canvas1.style.display === 'none') {
    info1.innerText = info1.innerText.toString().replace('indicador', 'gràfica');
    altaveu.src = './assets/graph.png';
  }
  if (canvas2.style.display === 'none') {
    info1.innerText = info1.innerText.toString().replace('gràfica', 'indicador');
    altaveu.src = './assets/gauge.png';
  }
});

fetch('https://sensors-soroll-api.herokuapp.com/getallids')
  .then((d) => d.json())
  .then((sensorIds) => {
    const ids = sensorIds
      .map((s) => +s.replace('NoiseLevelObserved-HOPVLCi', ''))
      .sort((a, b) => a - b);
    chartUrls = ids.map((id) => baseSearch + id);

    updateData();
  });

var graph1 = echarts.init(document.getElementById('container1'));
option1 = {
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

if (option1 && typeof option1 === 'object') {
  graph1.setOption(option1);
}

window.onresize = function () {
  let resizing = false;
  graph1.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      graph1.resize();
      resizing = false;
    }, 200);
  }
};
function updateData() {
  console.time('general');
  console.time('fetch');
  fetch(chartUrls[urlDisplayed])
    .then((d) => d.json())
    .then((d) => {
      console.log(d.length);
      console.timeEnd('fetch');
      nomCarrer = d[0].data[0].address.value;
      const dades = [];
      const valors = [];
      d.forEach((item) => {
        let info = item.data[0].LAeq;
        let d = new Date(info.metadata.TimeInstant.value);
        dades.push(d.toLocaleDateString('es-ES') + ' ' + d.toLocaleTimeString('es-ES')),
          valors.push(Math.floor(info.value));
      });
      console.time('options');
      graph1.setOption(
        (option1 = {
          title: {
            text: nomCarrer,
            left: '1%',
          },
          xAxis: {
            data: dades,
          },
          series: {
            data: valors,
          },
        })
      );
      console.timeEnd('options');
      infoPointer.innerText = 'Mostrar més';
      console.timeEnd('general');
    });
}

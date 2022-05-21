import {autoFontSize} from './functions.js';
import {state} from './state';
let gaugeDisplayed = 0;
let chart2 = echarts.init(document.getElementById('container2'));
const gaugePointer = document.querySelector('#pointer');

fetch('https://sensors-soroll-api.herokuapp.com/getall/last')
  .then((d) => d.json())
  .then((infoArray) => {
    infoArray.forEach((g) => {
      const carrer = g.address.value;
      const rawDataMedicio = g.LAeq.metadata.TimeInstant.value;
      const dataMedicio = new Date(rawDataMedicio);
      const fecha = new Intl.DateTimeFormat('cat-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }).format(dataMedicio);
      const laeq = g.LAeq.value;
      const lae90 = g.LA90.value;
      state.gauges.push(new Gauge({title: carrer, fecha, laeq: laeq, lae90: lae90}));
    });
    updateGaugeData(state.gauges);
  });
let option2;
option2 = {
  title: {
    text: '',
    top: '0%',
    left: '0%',
  },
  series: [
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 115,
      splitNumber: 10,
      itemStyle: {
        color: '#FFAB91',
      },
      progress: {
        show: true,
        width: 30,
        overlap: false,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          width: 30,
        },
      },
      axisTick: {
        distance: -45,
        splitNumber: 5,
        lineStyle: {
          width: 2,
          color: '#999',
        },
      },
      splitLine: {
        distance: -52,
        length: 14,
        lineStyle: {
          width: 3,
          color: '#999',
        },
      },
      axisLabel: {
        distance: -15,
        color: '#999',
        fontSize: 15,
      },
      // anchor: {
      //   show: false,
      // },
      // title: {
      //   show: false,
      // },
      detail: {
        valueAnimation: true,
        // width: '60%',
        // lineHeight: 40,
        // borderRadius: 8,
        offsetCenter: [0, '10%'],
        fontSize: autoFontSize(),
        fontWeight: 'bolder',
        formatter: '{value} dB LA90',
        color: 'auto',
      },
      data: [
        {
          value: 0,
        },
      ],
    },
    {
      type: 'gauge',
      center: ['50%', '60%'],
      startAngle: 200,
      endAngle: -20,
      min: 0,
      max: 115,
      itemStyle: {
        color: 'brown',
      },
      progress: {
        show: true,
        width: 12,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      detail: {
        offsetCenter: [0, '-10%'],
        fontSize: autoFontSize() / 1.3,
        fontWeight: 'bolder',
        formatter: '{value} dB LAeq',
        color: 'auto',
      },
      data: [
        {
          value: 0,
        },
      ],
    },
  ],
};

if (option2 && typeof option2 === 'object') {
  chart2.setOption(option2);
}

window.onresize = function () {
  let resizing = false;

  chart2.setOption({
    title: {
      textStyle: {
        fontSize: autoFontSize() / 1.9,
      },
    },
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.3,
        },
      },
    ],
  });

  chart2.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      chart2.resize();
      resizing = false;
    }, 10);
  }
};

gaugePointer.addEventListener('click', () => {
  if (state.screen === 'gauge') {
    ++gaugeDisplayed;
    if (gaugeDisplayed > state.gauges.length - 1) gaugeDisplayed = 0;
    updateGaugeData(state.gauges, gaugeDisplayed);
  }
});

class Gauge {
  constructor({title, fecha, laeq, lae90}) {
    this.title = title;
    this.fecha = fecha;
    this.laeq = laeq;
    this.lae90 = lae90;
  }
}

function updateGaugeData(gaugeArray, i = 0) {
  console.log('pasa');
  chart2.setOption({
    title: {
      text: `${gaugeArray[i].title}\n${gaugeArray[i].fecha}`,
      textStyle: {
        fontSize: autoFontSize() / 1.7,
      },
    },
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
        data: [
          {
            value: Math.floor(gaugeArray[i].lae90) ?? '??',
          },
        ],
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.3,
        },
        data: [
          {
            value: Math.floor(gaugeArray[i].laeq),
          },
        ],
      },
    ],
  });
}

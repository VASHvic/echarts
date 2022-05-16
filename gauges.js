// ! ordenar alfabeticament?
let gaugeDisplayed = 0;
const gauges = [];

fetch('https://sensors-soroll-api.herokuapp.com/getall/last')
  .then((d) => d.json())
  .then((infoArray) => {
    infoArray.forEach((g) => {
      const nomCarrer = g.address.value;
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
      gauges.push(new Gauge({title: nomCarrer, fecha, laeq: laeq, lae90: lae90}));
    });
    updateData(gauges);
  });
let chart1 = echarts.init(document.getElementById('container1'));
let app = {};
let option;
option = {
  //TODO: Borrar al final si no fa falta
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

if (option && typeof option === 'object') {
  chart1.setOption(option);
}

window.onresize = function () {
  let resizing = false;

  chart1.setOption({
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

  chart1.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      chart1.resize();
      resizing = false;
    }, 10);
  }
};

const container = document.querySelector('#pointer');
container.addEventListener('click', () => {
  ++gaugeDisplayed;
  if (gaugeDisplayed > gauges.length - 1) gaugeDisplayed = 0;
  updateData(gauges, gaugeDisplayed);
});

class Gauge {
  constructor({title, fecha, laeq, lae90}) {
    this.title = title;
    this.fecha = fecha;
    this.laeq = laeq;
    this.lae90 = lae90;
  }
}

function autoFontSize() {
  let width = document.getElementById('container1').offsetWidth;
  let height = document.getElementById('container1').offsetHeight;
  let newFontSize = Math.round((width + height) / 50);
  return newFontSize;
}
function updateData(gaugeArray, i = 0) {
  console.log(i);
  chart1.setOption({
    title: {
      text: `${gaugeArray[i].title}\nÚltima medició: ${gaugeArray[i].fecha}`,
      textStyle: {
        fontSize: autoFontSize() / 1.9,
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

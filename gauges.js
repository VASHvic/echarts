const chart2 = echarts.init(document.getElementById('container2'));
const gaugeUrls = chartUrls.map((url) => url.replace('all', 'one'));

class Gauge {
  constructor({title, fecha, laeq, lae90}) {
    this.title = title;
    this.fecha = fecha;
    this.laeq = laeq;
    this.lae90 = lae90;
  }
}

let gaugeDisplayed = 0;
pointer.addEventListener('click', () => {
  if (document.getElementById('container2').style.display === 'block') {
    infoPointer.innerText = 'Carregant noves dades...';
    ++gaugeDisplayed;
    if (gaugeDisplayed > gaugeUrls.length - 1) gaugeDisplayed = 0;
    getGaugeData(gaugeUrls[gaugeDisplayed]).then((gauge) => updateGaugeData(gauge));
  }
});

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
      detail: {
        valueAnimation: true,
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
getGaugeData(gaugeUrls[gaugeDisplayed]).then((gauge) => updateGaugeData(gauge));

window.addEventListener('resize', () => {
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
  graph1.resize();
  chart2.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      graph1.resize();
      chart2.resize();
      resizing = false;
    }, 200);
  }
});

function autoFontSize() {
  let width = document.getElementById('container2').offsetWidth;
  let height = document.getElementById('container2').offsetHeight;
  if (width > 1200) width = 1000;
  let newFontSize = Math.round((width + height) / 40);
  return newFontSize;
}

function updateGaugeData(gauge) {
  chart2.setOption({
    title: {
      text: `${gauge.title}\n${gauge.fecha}`,
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
            value: Math.floor(gauge.lae90) ?? '??',
          },
        ],
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.3,
        },
        data: [
          {
            value: Math.floor(gauge.laeq),
          },
        ],
      },
    ],
  });
}

async function getGaugeData(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  const [{data}] = jsonData;
  const nomCarrer = data[0].address.value;
  const rawDataMedicio = data[0].LAeq.metadata.TimeInstant.value;
  const dataMedicio = new Date(rawDataMedicio);
  const fecha = new Intl.DateTimeFormat('cat-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(dataMedicio);
  const laeq = data[0].LAeq.value;
  const lae90 = data[0].LA90.value;
  return new Gauge({title: nomCarrer, fecha, laeq: laeq, lae90: lae90});
}

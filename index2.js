function autoFontSize() {
  let width = document.getElementById('container1').offsetWidth;
  let height = document.getElementById('container1').offsetHeight;
  let newFontSize = Math.round((width + height) / 2 / 16);
  return newFontSize;
}

function updateData() {
  a.style.backgroundColor = 'red';
  chart1.setOption({
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.4,
        },
        data: [
          {
            value: 1,
          },
        ],
      },
    ],
  });
  chart.setOption({
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
        data: [
          {
            value: 100,
          },
        ],
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.4,
        },
        data: [
          {
            value: 1,
          },
        ],
      },
    ],
  });
}

const gauge1 = {
  title: '',
  laeq: 0,
  la90: 0,
};
const gauge2 = {
  title: '',
  laeq: 0,
  la90: 0,
};

fetch('https://sensors-soroll-api.herokuapp.com/get/4')
  .then((d) => d.json())
  .then((j) => {
    const {data} = j;
    const [info] = data;
    const infoCarrer = info?.name?.value;
    const [numSensor, nomCarrer] = infoCarrer.split('-');
    const rawDataMedicio = info.LAeq.metadata.TimeInstant.value;
    const infoDate = new Date(rawDataMedicio);
    const dataMedicio = new Intl.DateTimeFormat('cat-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(infoDate);
    const laeq = info.LAeq.value;
    const la90 = info.LA90.value;
    console.log(info.LAeq.value);
  });
let chart1 = echarts.init(document.getElementById('container1'));
let app = {};
let option;
option = {
  title: {
    // text: `${nomCarrer}\n ${dataMedicio}`,
    text: gauge1.title,
    top: '2%',
    left: '5%',
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
        distance: -25,
        color: '#999',
        fontSize: 20,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '10%'],
        fontSize: autoFontSize(),
        fontWeight: 'bolder',
        formatter: '{value} dB LA90',
        color: 'auto',
      },
      data: [
        {
          // value: Math.floor(la90),
          value: gauge1.la90,
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
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-10%'],
        fontSize: autoFontSize() / 1.4,
        fontWeight: 'bolder',
        formatter: '{value} dB LAeq',
        color: 'auto',
      },
      data: [
        {
          // value: Math.floor(laeq),
          value: gauge1.laeq,
        },
      ],
    },
  ],
};

if (option && typeof option === 'object') {
  chart1.setOption(option);
}

let chart2 = echarts.init(document.getElementById('container2'));
let app2 = {};
let option2;

option2 = {
  title: {
    text: 'Nivells mínims(LA Min) i màxims(LA Max)',
    top: '2%',
    left: '20%',
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
        distance: -25,

        color: '#999',
        fontSize: 20,
      },
      anchor: {
        show: false,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '10%'],
        fontSize: autoFontSize(),
        fontWeight: 'bolder',
        formatter: '{value} dB LAMax',
        color: 'auto',
      },
      data: [
        {
          value: 85,
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
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-10%'],
        fontSize: autoFontSize() / 1.4,
        fontWeight: 'bolder',
        formatter: '{value} dB LAMin',
        color: 'auto',
      },
      data: [
        {
          value: 40,
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

  chart1.setOption({
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.4,
        },
      },
    ],
  });
  chart2.setOption({
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.4,
        },
      },
    ],
  });
  chart1.resize();
  chart2.resize();
  if (resizing === false) {
    resizing = true;
    setTimeout(() => {
      chart1.resize();
      chart2.resize();
      resizing = false;
    }, 10);
  }
};

function autoFontSize() {
  let width = document.getElementById('container1').offsetWidth;
  let height = document.getElementById('container1').offsetHeight;
  let newFontSize = Math.round((width + height) / 2 / 30);
  return newFontSize;
}

function updateData({title, laeq, lae90, data}) {
  chart1.setOption({
    title: {text: `${title}\n ${data}`},
    series: [
      {
        detail: {
          fontSize: autoFontSize(),
        },
        data: [
          {
            value: Math.floor(lae90),
          },
        ],
      },
      {
        detail: {
          fontSize: autoFontSize() / 1.3,
        },
        data: [
          {
            value: Math.floor(laeq),
          },
        ],
      },
    ],
  });
}
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
    updateData({title: nomCarrer, laeq: laeq, lae90: la90, data: dataMedicio});
  });
let chart1 = echarts.init(document.getElementById('container1'));
let app = {};
let option;
option = {
  title: {
    // text: `${nomCarrer}\n ${dataMedicio}`,
    text: '',
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
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
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

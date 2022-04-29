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
    let dom = document.getElementById('container1');
    let myChart = echarts.init(dom);
    let app = {};
    let option;
    option = {
      title: {
        text: `${nomCarrer}\n ${dataMedicio}`,
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
            distance: -40,
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
            fontSize: 40,
            fontWeight: 'bolder',
            formatter: '{value} dB LA90',
            color: 'auto',
          },
          data: [
            {
              value: Math.floor(la90),
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
            fontSize: 30,
            fontWeight: 'bolder',
            formatter: '{value} dB LAeq',
            color: 'auto',
          },
          data: [
            {
              value: Math.floor(laeq),
            },
          ],
        },
      ],
    };

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }
  });

let dom2 = document.getElementById('container2');
let myChart2 = echarts.init(dom2);
let app2 = {};
let option2;

option2 = {
  title: {
    text: 'Nivells mínims(LA Min) i màxims(LA Max)',
    top: '2%',
    left: '20%',
  },
  // visualMap: {
  //   top: 50,
  //   right: 10,
  //   pieces: [
  //     {
  //       gt: 0,
  //       lte: 80,
  //       color: 'brown',
  //     },
  //     {
  //       gt: 80,
  //       lte: 90,
  //       color: 'orange',
  //     }
  //   ],
  // },
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
        distance: -40,
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
        fontSize: 40,
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
        fontSize: 30,
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
  myChart2.setOption(option2);
}

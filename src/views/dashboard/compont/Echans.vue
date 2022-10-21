<template>
  <div id="main" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    this.echartsBtn()
  },
  methods: {
    echartsBtn() {
      var myChart = echarts.init(document.getElementById('main'))

      // 指定图表的配置项和数据
      var option = {
        backgroundColor: '#161627',
        title: {
          text: ''
        },
        legend: {
          data: ['胡歌', '张三']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '干饭', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '睡觉', max: 100 },
            { name: '加班', max: 100 },
            { name: '摸鱼', max: 100 },
            { name: '考勤', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [50, 100, 0, 0, 0, 100],
                name: '胡歌'
              },
              {
                value: [100, 50, 100, 0, 100, 50],
                name: '张三'
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style>
#main{
    height: 500px;
    width: 500px;
}
</style>

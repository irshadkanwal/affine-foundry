import React from 'react'
import * as echarts from 'echarts'

const CustomEChart = ({ chartOptions = {}, elementId, chartStyles = {} }) => {
  React.useEffect(() => {
    const chartDom = document.getElementById(elementId)
    const myChart = echarts.init(chartDom)

    chartOptions && myChart.setOption(chartOptions)

    const handleResize = () => {
      myChart.resize()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      myChart.dispose()
    }
  }, [chartOptions, elementId])

  return (
    <div
      id={elementId}
      style={{ ...chartStyles }}
    ></div>
  )
}

export default CustomEChart

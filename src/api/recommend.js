import {
  fetch
} from '@/fetch/request'
import {
  configParam,
  qqMusicConfigParam
} from './config.js'

// 获取轮播图
export function getSliderList() {
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24
      },
      focus: {
        module: 'QQMusic.MusichallServer',
        method: 'GetFocus',
        param: {}
      }
    }
  }
  return fetch('', '/api/getRecomSlider', 'get', data)
}

// 歌单列表
export function getDiscList() {
  const data = Object.assign({}, configParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return fetch('', '/api/getDiscList', 'get', data)
}

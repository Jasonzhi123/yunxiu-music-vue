import {
  fetch
} from '@/fetch/request'
import {
  configParam,
  qqMusicConfigParam,
  jsonpOptions
} from './config.js'
import jsonp from 'utils/jsonp'

// 获取移动端歌手列表
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, configParam, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, jsonpOptions)
}

// 获取pc端歌手列表
export function getPCSingerList() {
  const data = {
    ...qqMusicConfigParam,
    '-': 'recom030954476498489703',
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singerList: {
        module: 'Music.SingerListServer',
        method: 'get_singer_list',
        param: {
          area: -100,
          sex: -100,
          genre: -100,
          index: -100,
          sin: 0,
          cur_page: 1
        }
      }
    }
  }
  console.log(data)
  return fetch('', '/api/getSingerList', 'get', data)
}
// 获取歌手的歌单列表
export function getSingerSongList(singer, pagesize = 20) {
  const data = {
    ...qqMusicConfigParam,
    '-': 'getSingerSong6924947693704',
    data: {
      comm: {
        ct: 24,
        cv: 0
      },
      singerSongList: {
        method: 'GetSingerSongList',
        param: {
          order: 1,
          singerMid: singer.id,
          begin: 0,
          num: pagesize
        },
        module: 'musichall.song_list_server'
      }
    }
  }
  console.log(data)
  return fetch('', '/api/getSingerSongList', 'get', data)
}

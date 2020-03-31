export default class Song {
  constructor({ id, name, mid, singer, album, image, interval }) {
    this.id = id
    this.name = name
    this.mid = mid
    this.singer = singer
    this.album = album
    this.interval = interval
    this.image = image
  }
}

export function createSong(songInfo) {
  return new Song({
    id: songInfo.id,
    mid: songInfo.mid,
    singer: filterSinger(songInfo.singer),
    name: songInfo.name,
    album: songInfo.album.name,
    interval: songInfo.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songInfo.album.mid}.jpg?max_age=2592000`
  })
}

function filterSinger(singer) {
  if (!singer) {
    return ''
  }
  const ret = singer.map(item => item.name)
  return ret.join('/')
}

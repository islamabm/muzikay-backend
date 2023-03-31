const stationService = require('./station.service.js')

const logger = require('../../services/logger.service')

async function getStations(req, res) {
  try {
    logger.debug('Getting Stations')
    const stations = await stationService.query()
    res.json(stations)
  } catch (err) {
    logger.error('Failed to get stations', err)
    res.status(500).send({ err: 'Failed to get stations' })
  }
}

async function getStationById(req, res) {
  try {
    const stationId = req.params.id
    console.log(
      'get station by id i n the station controller in the backl',
      stationId
    )
    const station = await stationService.getById(stationId)
    res.json(station)
  } catch (err) {
    logger.error('Failed to get station', err)
    res.status(500).send({ err: 'Failed to get station' })
  }
}

async function addStation(req, res) {
  const { loggedinUser } = req
  console.log('loggedinUser', loggedinUser)
  try {
    const station = req.body
    // station.owner = loggedinUser
    const addedStation = await stationService.add(station)
    res.json(addedStation)
  } catch (err) {
    logger.error('Failed to add station', err)
    res.status(500).send({ err: 'Failed to add station' })
  }
}

async function updateStation(req, res) {
  try {
    const station = req.body
    const updatedStation = await stationService.update(station)
    res.json(updatedStation)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}

async function removeStation(req, res) {
  try {
    const stationId = req.params.id
    console.log('stationid', stationId)
    const removedId = await stationService.remove(stationId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove station', err)
    res.status(500).send({ err: 'Failed to remove station' })
  }
}

async function addStationSong(req, res) {
  // const { loggedinUser } = req
  try {
    const stationId = req.params.id
    const song = req.body.song

    const savedSong = await stationService.addStationSong(stationId, song)
    res.json(savedSong)
  } catch (err) {
    logger.error('Failed to update station', err)
    res.status(500).send({ err: 'Failed to update station' })
  }
}

async function removeStationSong(req, res) {
  const { loggedinUser } = req
  try {
    const stationId = req.params.id
    const { songId } = req.params

    const removedId = await stationService.removeStationSong(stationId, songId)
    console.log('remove song from the back station service', removedId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove station msg', err)
    res.status(500).send({ err: 'Failed to remove station msg' })
  }
}

module.exports = {
  getStations,
  getStationById,
  addStation,
  updateStation,
  removeStation,
  addStationSong,
  removeStationSong,
}

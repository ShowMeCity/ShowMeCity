import React, { useState, useRef } from 'react';
import { fetchData } from './request/fetchData'; // Assuming fetchData is exported from your api file
import AudioPlayer from './AudioPlayer';
import VideoPlayer from './VideoPlayer';
import CountrySelector from './componenets/CountrySelector';
import IconRecordCircleFill from './assets/svg/CircleFill';
import IconSoundOn from './assets/svg/SoundOn';
import IconSoundOff from './assets/svg/SoundOff';

const App = () => {
  const childRef = useRef();
  const [videoId, setVideoId] = useState(null);
  const [isNoiseMuted, setIsNoiseMuted] = useState(false);
  const [radioPlaylists, setRadioPlaylists] = useState([
    { stationName: 'Default Radio', src: 'http://cinema.acs.its.nyu.edu:8000/wnyu128.mp3' },
  ]);

  const toogleVideoSound = () => {
    childRef.current.muteFunction();
  };

  const toogleActionBtn = () => {
    const actionBtn = document.querySelector('.action-btn');
    const navigation = document.querySelector('.navigation');
    actionBtn.classList.toggle('active-nav');
    navigation.classList.toggle('active-nav-holder');
  };

  const updateCurrentPlay = ({ orginalUrl, radios }) => {
    const vID = orginalUrl;
    const tracks = radios === null ? [{ stationName: 'Default Radio', src: 'http://cinema.acs.its.nyu.edu:8000/wnyu128.mp3' }] : radios;
    setRadioPlaylists(tracks);
    setVideoId(vID);
  };

  return (
    <>
      <section className="background">
        <div className="video-container">
          <VideoPlayer videoId={videoId} ref={childRef} isMuted={isNoiseMuted} setMuteToogleIcon={setIsNoiseMuted} />
        </div>
      </section>
      <section className="navigation-holder">
        {
          videoId && <button className="action-btn" onClick={toogleActionBtn} >
            <IconRecordCircleFill />
          </button>
        }

        <div className="navigation">
          <CountrySelector updatePlay={updateCurrentPlay} fetchData={fetchData} />
          <table className='control-table'>
            <thead>
              <tr>
                <th colSpan={3}>Speed</th>
                <th>Noise</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>  <button className='speed-btn' onClick={e => childRef.current.changeSpeed(0.5)}> <span className='speed-btn-text'>0.5x</span> </button></td>
                <td>  <button className='speed-btn' onClick={e => childRef.current.changeSpeed(1)}> <span className='speed-btn-text'>1x</span> </button></td>
                <td>  <button className='speed-btn' onClick={e => childRef.current.changeSpeed(2)}> <span className='speed-btn-text'>2x</span> </button></td>
                <td>  <button className='speed-btn' onClick={() => toogleVideoSound()}> {isNoiseMuted ? <IconSoundOff /> : <IconSoundOn />} </button> </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <hr />
                  <AudioPlayer tracks={radioPlaylists} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default App;

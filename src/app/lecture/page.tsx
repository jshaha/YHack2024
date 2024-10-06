"use client"
import { useRouter } from "next/navigation";

import Player from '@madzadev/audio-player'
import '@madzadev/audio-player/dist/index.css'

import { EmblaOptionsType } from 'embla-carousel'
import { useState, useRef, useEffect } from "react";

const dummyImages = [
  "https://via.placeholder.com/800x600?text=Slide+1",
  "https://via.placeholder.com/800x600?text=Slide+2",
  "https://via.placeholder.com/800x600?text=Slide+3",
];


export default function LecturePage() {
    const tracks = [
        {
          url: 'http://localhost:9000/audio/https___utfs.io_f_8awTsHrQMa5zm0UH2Bp7LDyIBUuiM7n0NGAeWfOdwHCaR8jP/lecture_0.mp3',
          title: 'lecture_0.mp3',
          tags: ['lecture']
        },
        {
          url: 'http://localhost:9000/audio/https___utfs.io_f_8awTsHrQMa5zm0UH2Bp7LDyIBUuiM7n0NGAeWfOdwHCaR8jP/lecture_1.mp3',
          title: 'lecture_1.mp3',
          tags: ['lecture']
        },
        {
          url: 'https://audioplayer.madza.dev/Madza-Persistence.mp3',
          title: 'Madza - Persistence',
          tags: ['dubstep']
        }
      ]
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const playerRef = useRef(null);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : dummyImages.length - 1;
            if (playerRef.current) {
                playerRef.current.playPreviousTrack();
            }
            return newIndex;
        });
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex < dummyImages.length - 1 ? prevIndex + 1 : 0;
            return newIndex;
        });
        if (playerRef.current) {
            playerRef.current.nextTrack();
        }
    };

 

    const handleTrackChange = (direction: string) => {
        if (direction === 'next') {
            handleNext();
        } else if (direction === 'prev') {
            handlePrev();
        }
    };

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.addEventListener('ended', handleNext);
            return () => {
                playerRef.current?.removeEventListener('ended', handleNext);
            };
        }
    }, []);

    return(
    <div className="w-flex flex-col items-center">
        <div className="flex justify-end">
        <button className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" onClick={() => router.push("/ending")}>
    <span>              End Lecture
    </span>      <svg className="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" fillRule="evenodd"></path></svg>
    </button>
        </div>

<div className="flex flex-row items-center justify-center gap-12">
          <div onClick={handlePrev} style={{ cursor: "pointer" }}>
          <button className="flex items-center justify-center w-12 h-12 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg>
  </button>       </div>
          <div className="flex flex-col items-center gap-8">
            <div 
              className="relative"
              onMouseEnter={() => {
                setIsHovering(true)
                clearTimeout(window.playerTimeout)
              }}
              onMouseLeave={() => {
                window.playerTimeout = setTimeout(() => {
                  setIsHovering(false)
                }, 2000)
              }}
            >
              <img
                src={dummyImages[currentIndex]}
                style={{
                  height: "600px",
                  border: `solid 10px brand200`,
                  minHeight: "80vh",
                  borderRadius: "5px",
                }}
                alt={`Slide ${currentIndex + 1}`}
              />
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-max">
                  <Player 
                    ref={playerRef}
                    trackList={tracks} 
                    includeTags={false}
                    includeSearch={false}
                    showPlaylist={false}
                    sortTracks={false}
                    autoPlayNextTrack={true} 
                    onClickNext={() => handleTrackChange('next')}
                    onClickPrevious={() => handleTrackChange('prev')}
                  />
                </div>
              
            </div>
          </div>
    <nav aria-label="Page navigation">
  <ul className="inline-flex space-x-2">
    <li><button className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">1</button></li>
    <li><button className="w-10 h-10 text-indigo-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-indigo-100">2</button></li>
    <li><button className="w-10 h-10 text-white transition-colors duration-150 bg-indigo-600 border border-r-0 border-indigo-600 rounded-full focus:shadow-outline">3</button></li>
  </ul>
</nav>
          </div>
          
          
          <div onClick={handleNext} style={{ cursor: "pointer" }}>
          <button className="flex items-center justify-center w-12 h-12 text-indigo-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
      <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" fillRule="evenodd"></path></svg></button>        </div>
        </div>

        
</div>
 
  );
}

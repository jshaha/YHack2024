"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  params: { url: string }; // Define the params prop
}

export default function LecturePageWrap({docs }: { docs: any }) {
  
  const dummyImages = docs.map((doc: { image_url: any; }) => doc.image_url);

  const tracks = docs.map((doc: { audio_url: any; page: any; }) => ({ url: doc.audio_url, title:  `Slide #${doc.page}` }));

  // const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load audio source when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentIndex].url;
      audioRef.current.load();
    }
  }, []);

  // Update audio source when currentIndex changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentIndex].url;
      audioRef.current.load();

      // If audio was playing, play the new track
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.log('Audio play error:', error);
        });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        handleNext();
      };
      const handlePlay = () => {
        setIsPlaying(true);
      };
      const handlePause = () => {
        setIsPlaying(false);
      };

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : dummyImages.length - 1;
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex < dummyImages.length - 1 ? prevIndex + 1 : 0;
      return newIndex;
    });
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (!audioRef.current.src || audioRef.current.src === window.location.href) {
        // Set the src and load if not set
        audioRef.current.src = tracks[currentIndex].url;
        audioRef.current.load();
      }
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log('Audio play error:', error);
        });
      }
    }
  };

  return (
    <div className="w-flex flex-col items-center">
      <div className="flex justify-end">
        <button
          className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          onClick={() => router.push("/ending")}
        >
          <span>End Lecture</span>
          <svg
            className="w-4 h-4 ml-3 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex flex-row items-center justify-center gap-12">
        <div onClick={handlePrev} style={{ cursor: "pointer" }}>
          <button className="flex items-center justify-center w-12 h-12 text-indigo-600 transition-colors bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => {
              setIsHovering(true);
              if (playerTimeoutRef.current) {
                clearTimeout(playerTimeoutRef.current);
                playerTimeoutRef.current = null;
              }
            }}
            onMouseLeave={() => {
              playerTimeoutRef.current = setTimeout(() => {
                setIsHovering(false);
              }, 2000);
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
            {/* Overlay */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black cursor-pointer transition-opacity ease-in-out ${isHovering ? 'bg-opacity-50' : 'bg-opacity-0'}`}
              onClick={togglePlayPause}
            >
              {isHovering && (
                <>
                  {isPlaying ? (
                    // Pause Icon
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <rect x="5" y="4" width="3" height="12"></rect>
                      <rect x="12" y="4" width="3" height="12"></rect>
                    </svg>
                  ) : (
                    // Play Icon
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 4l12 6-12 6V4z"></path>
                    </svg>
                  )}
                </>
              )}
            </div>
          </div>
          <nav aria-label="Page navigation">
            <ul className="inline-flex space-x-2">
              {dummyImages.map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => setCurrentIndex(index)}
                    className={`w-10 h-10 rounded-full focus:shadow-outline transition-colors ${
                      currentIndex === index
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div onClick={handleNext} style={{ cursor: "pointer" }}>
          <button className="flex items-center justify-center w-12 h-12 text-indigo-600 transition-colors bg-white rounded-full focus:shadow-outline hover:bg-indigo-100">
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 20 20"
            >
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Hidden audio element */}
      <audio ref={audioRef} hidden />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import img from "./images/radio-cassette-gd2eb80778_1280.png";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationType, setstationType] = useState("classical");

  useEffect(() => {
    setupApi(stationType).then((data) => {
      setStations(data);
    });
  }, [stationType]);

  const setupApi = async (stationType) => {
    const api = new RadioBrowserApi(fetch.bind(window), "Radio");

    const stations = await api
      .searchStations({
        language: "english",
        tag: stationType,
        limit: 32,
      })
      .then((data) => {
        return data;
      });
    return stations;
  };

  const types = [
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const setImage = (event) => {
    event.target.src = img;
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap justify-center mb-4">
        {types.map((type, index) => (
          <button
            key={index}
            className={`px-4 py-2 m-1 rounded-full text-white ${
              stationType === type
                ? "bg-blue-500"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
            onClick={() => setstationType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stations &&
          stations.map((station, index) => (
            <div
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              key={index}
            >
              <img
                className="w-full h-20 object-cover"
                src={station.favicon}
                alt="station logo"
                onError={setImage}
              />
              <div className="p-4">
                <h6 className="text-lg font-bold mb-2 text-center">
                  {station.name}
                </h6>
                <AudioPlayer
                  className="w-full"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

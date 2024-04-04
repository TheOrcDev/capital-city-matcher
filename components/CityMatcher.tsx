"use client";

import React, { useEffect, useState } from "react";

interface Match {
  country: string;
  capital: string;
}

// TODO: get this data from the backend
const preMatchedData = [
  { country: "USA", capital: "Washington D.C." },
  { country: "UK", capital: "London" },
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
];

const shuffleArray = (matchingData: Match[]) => {
  return matchingData.slice().sort(() => Math.random() - 0.5);
};

export default function CityMatcher() {
  const [shuffledMatchData, setShuffledMatchData] =
    useState<Match[]>(preMatchedData);
  const [pairedData, setPairedData] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    setShuffledMatchData(shuffleArray(preMatchedData));
  }, []);

  const handleCapitalClick = (match: Match) => {
    if (match === selectedMatch) {
      const newPairedMatch = [...pairedData, match];
      setPairedData(newPairedMatch);
    }
    setSelectedMatch(null);
  };

  const isMatched = (match: Match) =>
    pairedData.some((pairedMatch) => pairedMatch === match);

  const win = pairedData.length === preMatchedData.length;

  return (
    <>
      {win && <h2 className="absolute text-green-500">You Win!</h2>}
      <div className="flex gap-5 mt-10">
        <div className="flex flex-col gap-2">
          {preMatchedData.map((match, index) => (
            <button
              className={`
            rounded px-4 py-2 text-white font-bold
            hover:bg-gray-700 hover:scale-105 transition ease-in duration-300
            ${isMatched(match) ? "bg-green-500" : "bg-gray-500"}
            ${selectedMatch === match && "bg-gray-900"}
            `}
              key={index}
              onClick={() => setSelectedMatch(match)}
            >
              {match.country}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledMatchData.map((match, index) => (
            <button
              className={`
            bg-gray-500 rounded px-4 py-2 text-white font-bold
            ${
              selectedMatch !== null
                ? "hover:bg-gray-700 hover:scale-105 transition ease-in duration-300"
                : "cursor-not-allowed"
            }
            ${isMatched(match) ? "bg-green-500" : "bg-gray-500"}
            `}
              key={index}
              disabled={selectedMatch === null}
              onClick={() => handleCapitalClick(match)}
            >
              {match.capital}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

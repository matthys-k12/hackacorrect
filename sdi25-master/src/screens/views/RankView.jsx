import React, { useEffect, useState } from "react";
import { handleServiceGetRankList } from "../../services/quizService";

export default function RankView() {
  const [listPlayer, setPlayerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getList() {
    setIsLoading(true);
    const result = await handleServiceGetRankList();
    const sortedData = result.sort((a, b) => b.score - a.score);
    setPlayerList(sortedData);
    setIsLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="py-24 px-4 max-w-[900px] mx-auto space-y-6">
      <h1 className="font-bold text-xl">Classement des joueurs</h1>

      {!isLoading ? (
        <div>
          {listPlayer.map((player, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center mb-4">
                <img
                  className="w-10 h-10 me-4 rounded-full bg-gray-100 p-2"
                  src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <p>
                    {player.nom}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-500 dark:text-gray-400"
                    >
                      score : {player.score}
                    </time>
                  </p>
                </div>
              </div>
              <h3 className="text-lg">
                <span className="text-3xl font-bold">{index + 1}</span>e
              </h3>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import gameRoundsApi from "apis/gameRounds";
import { PageLoader, PageTitle, Container, Button } from "components/commons";

const Dashboard = () => {
  const [gameRounds, setGameRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGameRounds = async () => {
    try {
      const {
        data: { game_round },
      } = await gameRoundsApi.fetch();
      setGameRounds(game_round);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const createGameRounds = async choice => {
    const payload = {
      game_round: { choice },
    };

    try {
      await gameRoundsApi.create(payload);
      fetchGameRounds();
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameRounds();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(gameRounds)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not played any game yet. Play by clicking on any of the
          following buttons.
        </h1>
        <div className="flex justify-center">
          <Button
            buttonText="Rock"
            onClick={() => createGameRounds("rock")}
            className="mr-2"
          />
          <Button
            buttonText="Paper"
            onClick={() => createGameRounds("paper")}
            className="mr-2"
          />
          <Button
            buttonText="Scissor"
            onClick={() => createGameRounds("scissor")}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle title="Play game" />
        <div className="flex">
          <Button
            buttonText="Rock"
            className="mr-2"
            onClick={() => createGameRounds("rock")}
          />
          <Button
            buttonText="Paper"
            className="mr-2"
            onClick={() => createGameRounds("paper")}
          />
          <Button
            buttonText="Scissor"
            onClick={() => createGameRounds("scissor")}
          />
        </div>
        <div className="inline-block min-w-full">
          <table className="min-w-56 border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                  Player choice
                </th>
                <th className="border-b border-r border-gray-300 bg-gray-100 px-4 py-2.5 text-left text-xs font-bold uppercase leading-4 text-gray-800">
                  AI choice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {gameRounds.map((gameRound, idx) => (
                <>
                  <tr key={idx}>
                    <td className="border-r border-gray-300 px-4 py-2.5 text-sm font-medium capitalize">
                      {gameRound.choice}
                    </td>
                    <td className="border-r border-gray-300 px-4 py-2.5 text-sm font-medium capitalize">
                      {gameRound.ai_choice}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

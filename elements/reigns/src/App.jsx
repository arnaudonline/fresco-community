import React, { useEffect } from "react";
import { Meters } from "./Meters";
import { Question } from "./Question";
import { NoAnswer } from "./NoAnswer";
import { YesAnswer } from "./YesAnswer";
import { NOT_STARTED, ENDED, ERROR, LOADING } from "./constants";
import { useSelector, useDispatch, useStore } from "react-redux";
import { answerNo, answerYes, initializeGame, startGame, updateGame  } from "./features/game/gameSlice";

const useFresco = function () {
  const dispatch = useDispatch();

  useEffect(() => {
    fresco.onReady(function () {
      fresco.onStateChanged(function () {
        const state = fresco.element.state;
        console.log("onStateChanged", state);
        dispatch(updateGame(state));
      });

      const defaultState = {
        selectedCard: null,
        phase: LOADING,
        stats: [],
        gameUrl: 'https://localhost:3001/games/gdpr.json',
      };

      fresco.initialize(defaultState, { 
        title: "Reigns", 
        toolbarButtons: [
        {
          title: "Game url",
          ui: { type: "string" },
          property: "gameUrl",
        }]});
    });
  }, []);

  const store = useStore();
  const updateFrescoState = () => {
    const state = store.getState();
    console.log("updateFrescoGameState", state);
    fresco.setState({
      phase: state.game.phase,
      selectedCard: state.game.selectedCard,
      stats: state.game.stats,
    });
  };
  return updateFrescoState;
};

export default function App() {
  const phase = useSelector((state) => state.game.phase);
  const selectedCard = useSelector((state) => state.game.selectedCard);
  const currentStats = useSelector((state) => state.game.stats);
  const gameUrl = useSelector((state) => state.game.gameUrl);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (!gameUrl) {
      return;
    }
    dispatch(initializeGame(gameUrl));
  }, [gameUrl]);
  const updateFrescoState = useFresco();

  const doAnswerNo = () => {
    dispatch(answerNo());
    updateFrescoState();
  };
  const doAnswerYes = () => {
    dispatch(answerYes());
    updateFrescoState();
  };
  const doStartGame = () => {
    dispatch(startGame());
    updateFrescoState();
  };

  if (phase === LOADING) {
    return (
      <div className="death">
        Loading...
      </div>
    );
  }

  if (phase === ERROR) {
    return (
      <div className="death">
        ERROR :(
      </div>
    );
  }

  if (phase === ENDED) {
    return (
      <div className="death" onClick={doStartGame}>
        {gameDefinition.deathMessage}
      </div>
    );
  }

  if (phase === NOT_STARTED) {
    return (
      <div className="death" onClick={doStartGame}>
        Click to start
      </div>
    );
  }

  return (
    <>
      <Meters stats={currentStats} />
      <Question card={selectedCard} />
      <div className="answers">
        <NoAnswer text={selectedCard.answer_no || "No"} onClick={doAnswerNo} />
        <div className="answer answer--neutral" />
        <YesAnswer
          text={selectedCard.answer_yes || "Yes"}
          onClick={doAnswerYes}
        />
      </div>
    </>
  );
}

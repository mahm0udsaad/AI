import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as qna from '@tensorflow-models/qna';

function App() {
  const passRef = useRef(null);
  const questRef = useRef(null);
  const [answer, setAnswer] = useState('');
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const loadedModel = await qna.load();
      setModel(loadedModel);
      console.log('Model successfully loaded', qna.version);
    }

    loadModel();
  }, []);

  const answerQuestion = async (e) => {
    if (model !== null) {
      const pass = passRef.current.value;
      const quest = questRef.current.value;

      const answers = await model.findAnswers(quest, pass);
      setAnswer(answers);
      console.log(answers);
    }
  };

  return (
    <>
      {!model ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>Hello Chat GPT</h1>
           <form style={{display:"grid"}}>
           <textarea ref={passRef} name="question" id="1" cols="30" rows="10" placeholder='Paste your content'></textarea>
          <input style={{padding:'1rem'}} ref={questRef} onKeyUp={answerQuestion} className="answer"  placeholder='Write your question'/>
           </form>
          <div>
            <h2>Answers:</h2>
            {answer && answer.map((ans, idx) => (
              <p key={idx}>{idx + 1}-{ans.text} {Math.round(ans.score) * 100}%</p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;

import React from 'react';
import Intro from './Components/Intro';
import Options from './Components/Options';

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  const [showOptions, setShowOptions] = React.useState(true);

  const [OrderType, setOrderType] = React.useState('');
  return (
    <>
      {showIntro && <Intro setShowIntro={setShowIntro} />}
      {showOptions && <Options setShowOptions={setShowOptions} setOrderType={setOrderType} />}
      <button onClick={() => setShowIntro(true)}>Click me for Intro</button>
      <br />
      <button onClick={() => setShowOptions(true)}>Click me for Options</button>
    </>
  );
}

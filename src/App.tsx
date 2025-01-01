import React from 'react';
import Intro from './Components/Intro.jsx';

export default function App() {
  const [showIntro, setShowIntro] = React.useState(true);
  return (
    <>
      {
        showIntro &&
      <Intro setShowIntro={setShowIntro}/>
      }
      <button onClick={() => setShowIntro(true)}>Click me</button>
    </>
  );
}

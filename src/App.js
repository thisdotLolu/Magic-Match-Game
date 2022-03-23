import { useState,useEffect } from 'react';
import './App.css';
import SingleCard from './SingleCard';



const cardImages=[
  {"src":"/img/helmet-1.png",matched:false},
  {"src":"/img/potion-1.png",matched:false},
  {"src":"/img/ring-1.png",matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png",matched:false},
  {"src":"/img/sword-1.png",matched:false},
]





function App() {
const[cards, setCards]=useState([]);
const[turns, setTurns]=useState(0);
const[choiceone, setChoiceone]=useState(null)
const[choicetwo, setChoicetwo]=useState(null)



const handleChoice=(card)=>{
  // console.log(card)
  choiceone? setChoicetwo(card):setChoiceone(card)
}

useEffect(()=>{
  if(choiceone&&choicetwo){
    if(choiceone.src===choicetwo.src){
      // console.log('same')
      setCards(prevCards=>{
        return prevCards.map(card=>{
          if(card.src===choiceone.src){
            return{...card, matched:true}
          }else{
            return{...card}
          }

        })
      })
      resetTurn()
    }else{
      // console.log('no match')
      setTimeout(()=>resetTurn(),1000)
    }
  }
},[choiceone,choicetwo])


console.log(cards);

const resetTurn=()=>{
  setChoiceone(null)
  setChoicetwo(null)
  setTurns(prevTurns=>prevTurns+1)
}



  //shuffle cards
  const shuffleCards=()=>{
    const shuffleCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id: Math.random()})
    )
    setCards(shuffleCards);
    
    setTurns(0)    
  }
  return (
    <div className="App">
     <h1>Magic Match</h1>
     <button onClick={shuffleCards}>New Game</button>
    <div className="card-grid">
    {cards.map(card=>{
      return(
       <SingleCard 
       card={card} 
       key={card.id} 
       handleChoice={handleChoice}
       flipped={card===choiceone || card===choicetwo || card.matched}
       ></SingleCard>
      )
      })}
    </div>
    </div>
  );
}

export default App;

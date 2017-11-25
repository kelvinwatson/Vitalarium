import React from 'react';
import { Link } from 'react-router-dom';
// import DebugLog from '../../Utils/DebugLog';
import './Sprints.css'

export default class Sprints extends React.Component {
  render(){
    return (
      <div className="mh5-ns Sprints">
        <header className="fn fl-ns pr4-ns">
          <h1 className="f2 lh-title fw9 mb3 mt0 pt3 bw2">
            Sprints
          </h1>
          <h2 className="f3 mid-gray lh-title">
            An excerpt from the Form of the Book by Jan Tschichold
          </h2>
          <time className="f6 ttu tracked gray">Sometime before 1967</time>
        </header>

        <div className="fn fl-ns">
          <p className="lh-copy measure mt4 mt0-ns">
            PERFECT typography is more a science than an art. Mastery of the trade is
            indispensable. Unerring taste, the hallmark of
            perfection, rests also upon a clear understanding of the laws of harmonious
            design. As a rule, impeccable taste springs partly from inborn sensitivity:
            from feeling. But feelings remain rather unproductive unless they can inspire a
            secure judgment. Feelings have to mature into knowledge about the consequences
            of formal decisions. For this reason, there are no born masters of typography,
            but self- education may lead in time to mastery.
          </p>
          <p className="lh-copy measure">
            It is wrong to say that there is no arguing about taste when it is good taste
            that is in question. We are not born with good taste, nor do we come into this
            world equipped with a real understanding of art. Merely to recognize who or
            what is represented in a picture has little to do with a real under- standing
            of art. Neither has an uninformed opinion about the proportions of Roman
            letters. In any case, arguing is senseless. He who wants to convince has to
            do a better job than others.
          </p>
        </div>
      </div>
    )
  }
}

import React from 'react';
import DebugLog from '../../Utils/DebugLog';
import './About.css'

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div>
      <article className="cf pa3 mw9 center">
        <header className="fl w-100 w-50-l pa3-m pa4-l mb3 mb5-l">
          <h2 className="lh-title f3 b mt0">
            What is Vitalarium? It is an tool for scheduling and organizing your tasks, Scrum style.
          </h2>
        </header>
        <section className="fl w-100">
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <p className="f6 lh-copy measure">
              Scrum is a methodology for scheduling your tasks. It is used by many professionals in a variety of fields.
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <p className="f6 lh-copy measure">
              True book design, therefore, is a matter of tact (tempo, rhythm,
              touch) alone. It flows from something rarely appreciated today:
              good taste. The book designer strives for perfection; yet every
              perfect thing lives somewhere in the neighborhood of dullness and
              is frequently mistaken for it by the insensitive. In a time that
              hungers for tangible novelties, dull perfection holds no
              advertising value at all.
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <p className="f6 lh-copy measure">
              In a masterpiece of typography, the artists signature has been
              eliminated. What some may praise as personal styles are in reality
              small and empty peculiarities, frequently damaging, that masquerade
              as innovations.
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <p className="f6 lh-copy measure">
              Only through constant practice and strictest self-criticism may we
              develop a sense for a perfect piece of work. Unfortunately, most
              seem content with a middling performance. Careful spacing of words
              and the correct spacing of capital letters appear to be unknown or
              unimportant to some typesetters, yet for him who investigates, the
              correct rules are not difficult to discover.
            </p>
          </div>
        </section>
      </article>

      <article className="pa3 pa5-ns" data-name="slab-stat-small">
        <h3 className="f6 ttu tracked">Today</h3>
        <div className="cf">
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Closed Issues</dd>
            <dd className="f3 fw6 ml0">1,024</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Open Issues</dd>
            <dd className="f3 fw6 ml0">993</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Next Release</dd>
            <dd className="f3 fw6 ml0">10-22</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Days Left</dd>
            <dd className="f3 fw6 ml0">4</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title mr5-l">
            <dd className="f6 fw4 ml0">Favorite Cat</dd>
            <dd className="f3 fw6 ml0">All of Them</dd>
          </dl>
          <dl className="fl fn-l w-50 dib-l w-auto-l lh-title">
            <dd className="f6 fw4 ml0">App Downloads</dd>
            <dd className="f3 fw6 ml0">1,200</dd>
          </dl>
        </div>
      </article>

      <article className="center ph3 ph5-ns tc br2 pv5 bg-washed-green dark-green mb5">
        <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
          Ready to use Vitalarium?
        </h1>
        <h2 className="fw2 f4 lh-copy mt0 mb3">
          This will change things. And we want you to be involved. This text needs to
          be longer for testing sake.
        </h2>
        <p className="fw1 f5 mt0 mb3">
          Sign up for beta access or learn more about Vitalarium.
        </p>
        <div>
          <a className="f6 br-pill bg-dark-green no-underline washed-green ba b--dark-green grow pv2 ph3 dib mr3"
            href="#">
            Sign Up
          </a>
          <a className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
            href="#">
            Learn More
          </a>
        </div>
      </article>
    </div>
    )
  }
}

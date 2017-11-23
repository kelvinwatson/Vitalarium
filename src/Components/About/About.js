import React from 'react';
import { Link } from 'react-router-dom';
// import DebugLog from '../../Utils/DebugLog';
import { switchTheme } from '../../Utils/Themes';
import './About.css'

export default class About extends React.Component {
  render(){
    return (
    <div>
      <article className="cf mw9 center">
        <header className={`fl w-100 pv5 ph3 ph5-l ph4-m AboutHeaderBackground ${switchTheme()}`}>
          <div className="w-50-l">
            <h2 className="lh-title f4 b mt0">
              What is Vitalarium?
            </h2>
            <div className="f3 lh-title fw3">
              It&apos;s a <strong className="fw5">Scrum project management tool</strong> for scheduling and organizing tasks in your <strong className="fw5">projects</strong> and <strong className="fw5">daily life</strong>.
            </div>
          </div>
        </header>
        <section className="fl w-100 ph3 ph4-l ph3-m">
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <h3 className="f4 fw4 lh-copy">What&apos;s Scrum?</h3>
            <p className="f6 lh-copy measure">
              Scrum is an agile methodology for scheduling your tasks. It is used by many professionals in a variety of fields.
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <h3 className="f4 fw4 lh-copy">Why use Vitalarium?</h3>
            <p className="f6 lh-copy measure">
              Vitalarium helps manage your tasks, in your projects or daily life!
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <h3 className="f4 fw4 lh-copy">How are we different from other agile project management tools?</h3>
            <p className="f6 lh-copy measure">
              Vitalarium is completely <strong>free</strong> to use!
            </p>
          </div>
          <div className="fl w-100 w-50-m w-25-l pa3-m pa4-l">
            <h3 className="f4 fw4 lh-copy">Ready to organize your projects and your life?</h3>
            <p className="f6 lh-copy measure">
              Start <Link to="/login" className="link dim dark-gray f6 f5-l dib mr3 mr4-l">here!</Link>
            </p>
          </div>
        </section>
      </article>

      <article className="pa3 pa5-ns">
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

      <article className="center ph3 ph5-ns tc br2 pv5 bg-yellow near-black">
        <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
          Ready to use Vitalarium?
        </h1>
        <h2 className="fw4 f4 lh-copy mt0 mb3">
          Use it for free.
        </h2>
        <p className="f5 mt0 mb3">
          Sign up for beta access or learn more about Vitalarium.
        </p>
        <div>
          <a className="fw6 f6 br-pill no-underline b--near-black bg-near-black yellow ba grow pv2 ph3 dib mr3">
            Sign Up
          </a>
          <a className="f6 br-pill near-black b--near-black no-underline ba grow pv2 ph3 dib">
            Learn More
          </a>
        </div>
      </article>
    </div>
    )
  }
}

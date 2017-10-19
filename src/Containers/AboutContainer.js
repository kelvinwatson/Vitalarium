import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import About from '../Components/About/About';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About)

export default AboutContainer;

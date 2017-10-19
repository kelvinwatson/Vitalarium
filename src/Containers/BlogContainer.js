import { connect } from 'react-redux';
import DebugLog from '../Utils/DebugLog';
import Blog from '../Components/Blog/Blog';
// import { scrollDown, scrollUp } from '../Actions';

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

export default BlogContainer;

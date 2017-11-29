import { connect } from 'react-redux';
// import DebugLog from '../Utils/DebugLog';
import CloseCreateTaskWarningModal from '../Components/CloseCreateTaskWarningModal/CloseCreateTaskWarningModal';
import { createTaskCancelCloseWarningModal, createTaskDeleteCloseWarningModal } from '../Actions';

const mapStateToProps = (state) => {
  return {
    isOpen: state.task.isShowCreateCloseWarningModal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancel: ()=>{
      dispatch(createTaskCancelCloseWarningModal());
    },
    confirmDeleteTask:()=>{
      dispatch(createTaskDeleteCloseWarningModal());
    },
  }
}

const CloseCreateTaskWarningModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CloseCreateTaskWarningModal)

export default CloseCreateTaskWarningModalContainer;

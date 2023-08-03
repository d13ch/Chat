import ModalAdd from './ModalAdd';
import ModalRemove from './ModalRemove';
import ModalRename from './ModalRename';

const modals = {
  add: ModalAdd,
  remove: ModalRemove,
  rename: ModalRename,
};

export default (type) => modals[type];

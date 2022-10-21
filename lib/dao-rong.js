'use babel';

import DaoRongView from './dao-rong-view';
import { CompositeDisposable } from 'atom';

export default {

  daoRongView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.daoRongView = new DaoRongView(state.daoRongViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.daoRongView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dao-rong:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.daoRongView.destroy();
  },

  serialize() {
    return {
      daoRongViewState: this.daoRongView.serialize()
    };
  },

  toggle() {
    console.log('DaoRong was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};

'use babel';

import DaoRong from '../lib/dao-rong';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('DaoRong', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('dao-rong');
  });

  describe('when the dao-rong:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.dao-rong')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'dao-rong:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.dao-rong')).toExist();

        let daoRongElement = workspaceElement.querySelector('.dao-rong');
        expect(daoRongElement).toExist();

        let daoRongPanel = atom.workspace.panelForItem(daoRongElement);
        expect(daoRongPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'dao-rong:toggle');
        expect(daoRongPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.dao-rong')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'dao-rong:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let daoRongElement = workspaceElement.querySelector('.dao-rong');
        expect(daoRongElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'dao-rong:toggle');
        expect(daoRongElement).not.toBeVisible();
      });
    });
  });
});

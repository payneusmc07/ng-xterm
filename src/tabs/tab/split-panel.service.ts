import { Injectable } from "@angular/core"
import { SplitPanel } from "@shared/utils"
import { Observable, of } from "rxjs"
import { TerminalComponent } from "@terminal/terminal.component"

@Injectable({ providedIn: "root"})

/** This service will allow the user to add up to 2 additional
 * terminals to any given ng-xterm-tab-component.
 * */
export class SplitPanelService {

	/**
	 * To start, each tab component will have only one terminal (or panel).
	 * Each additional "split" of the panel will "push" a new terminal onto the splitPanelContent
	 * array. Each new terminal must have an id, and be of type TerminalComponent
	 * in order to conform to the SplitPanel interface.
	 *
	 * @see src/shared/utils/constants
	 * */
	private splitPanelContent: SplitPanel[] = [
		{ id: 0, component: TerminalComponent }
	]

	/**
	 * Get the initial number of terminals to be displayed in the panel.
	 *
	 * @returns {Observable<SplitPanel[]>} An observable which holds the initial content
	 * of the SplitPanel (1 by default).
	 * */
	getPanels(): Observable<SplitPanel[]> {
		return of(this.splitPanelContent)
	}

	/**
	 * Add a new terminal "panel" to the active tab. Unfortunately, we need
	 * to limit the user to upto 2 additional terminals (in addition to the original terminal).
	 * If more than 3 terminals exist inside one tab, Bootstrap does not render
	 * the columns which hold the additional terminals properly and resizing of the terminal(s)
	 * is greatly impacted.
	 *
	 * @param {number} id the id to be associated with a given panel.
	 * @param {TerminalComponent} component the terminal component being added to the split panel.
	 *
	 * @returns an observable containing the new contents of the split panel.
	 * */
	addPanel(id: number, component: TerminalComponent): Observable<SplitPanel[]> {
		// make sure there are not more than 3 terminals inside the panel
		if(this.splitPanelContent.length === 3) {
			alert("There cannot be more than 3 terminals inside one tab.")
			return
		}
		// if there are less than 3, add the new terminal id, and component to the split oanel.
		this.splitPanelContent.push({...this.splitPanelContent, id, component })
		// return the observable containing the current split panel content.
		return of(this.splitPanelContent)
	}

	/**
	 * Remove a panel from the split panel based on its id.
	 * @param {number} panelToRemove the panel to be removed
	 * */
	removePanel(panelToRemove: number): Observable<SplitPanel[]> {
		// make sure the user cannot remove the first panel
		if(this.splitPanelContent.length === 1) {
			alert("The first panel cannot be removed")
			return
		}
		// return a copy of the new split panel contents, minus panel which was removed
		return of(this.splitPanelContent.splice(panelToRemove, 1))
	}
}

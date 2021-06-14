import { Injectable } from "@angular/core"
import { SplitPanel } from "@shared/models/split-panel.model"
import { Observable, of } from "rxjs"
import { TerminalComponent } from "@terminal/terminal.component"

@Injectable({ providedIn: "root"})

/** This service will allow the user to add up to 2 additional
 * terminals to any given ng-xterm-tab-component.
 * */
export class SplitPanelService {

	/**
	 * To start, each tab component will have only one tab.
	 * Each additional "split" of the panel will and a new terminal to the splitPanelContent
	 * array. Each new terminal must have an id, and be of type TerminalComponent.
	 * */
	private splitPanelContent: SplitPanel[] = [
		{ id: 0, component: TerminalComponent }
	]

	/**
	 * Get the initial number of terminals to be displayed in the panel.
	 *
	 * @returns an observable which contains a SplitPanel array.
	 * This array holds the current number of terminals.
	 * */
	getPanels(): Observable<SplitPanel[]> {
		return of(this.splitPanelContent)
	}

	/**
	 * Add a new terminal "panel" to the tab. Unfortunately, we need
	 * to limit the user to upto 2 additional terminals (in addition to the original).
	 * If more than 3 terminals exist inside one tab, Bootstrap does not seem to render
	 * the columns properly.
	 *
	 * @param {number} id the id to be associated with a given panel.
	 * @param {TerminalComponent} component the terminal component being added to the split panel.
	 *
	 * @returns an observable containing the new splitPanelContent array.
	 * */
	addPanel(id: number, component: TerminalComponent): Observable<SplitPanel[]> {
		// make sure there are not more than 3 terminals inside the panel
		if(this.splitPanelContent.length > 3) {
			alert("There cannot be more than 3 terminals inside one tab.")
			return
		}
		// if there are less than 3, add the new terminal id, and component to the array.
		this.splitPanelContent.push({ id, component })
		// return the observable containing the current split panel content
		return of(this.splitPanelContent)
	}

	/**
	 * Remove a selected panel from the split panel.
	 * @param {number} panelToRemove the panel to be removed from the split panel
	 * */
	removePanel(panelToRemove: number): Observable<SplitPanel[]> {
		if(this.splitPanelContent.length === 1) {
			alert("The first panel cannot be removed")
			return
		}
		return of(this.splitPanelContent.splice(panelToRemove, 1))
	}
}

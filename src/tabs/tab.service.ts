import { Injectable } from "@angular/core"
import { Tab } from "@shared/models/tab.model"
import { Observable, of } from "rxjs"
import { SplitPanelComponent } from "./tab/split-panel.component"

@Injectable({ providedIn: "root" })

/**
 * A service which will allow the user to have multiple terminal tabs
 * open at once.
 * */
export class TabService {
	/**
	 * To start, the ui will only show one tab.
	 * Each time a new splitPanel is added to the ui, the
	 * id variable will increase by one. Each tab will initially only contain
	 * one split panel. But this panel will be able to be "split" (have up to 2
	 * additional terminals inside it).
	 * */
	tabContent: Tab[] = [
		{ id: 0, component: SplitPanelComponent }
	]

	/**
	 * Get the current tabs in the array.
	 * @returns an observable which contains the current tabs in the array.
	 * */
	getTabs(): Observable<Tab[]> {
		return of(this.tabContent)
	}

	/**
	 * Add a new terminal tab to the UI.
	 * @param {number} id the id which will be associated the new tab.
	 * @param {SplitPanelComponent} component the new tab to be added to the ui.
	 *
	 * @returns an observable containing the new tabContent array.
	 * */
	addTerminal(id: number, component: SplitPanelComponent): Observable<Tab[]> {
		// add the new tab, id, and component to the tabContent array
		this.tabContent.push({ ...this.tabContent, id, component })

		// return the observable containing the new tabContent array.
		return of(this.tabContent)
	}

	/**
	 * Remove a selected tab from the UI.
	 * This id based of the ID assigned to it during the addTerminal() call.
	 * @param {number} tabToRemove the tab to be removed from the ui
	 * */
	removeTerminal(tabToRemove: number): Observable<Tab[]> {
		if(this.tabContent.length === 1) {
			alert("The first tab cannot be removed")
			return
		}
		return of(this.tabContent.splice(tabToRemove, 1))
	}
}

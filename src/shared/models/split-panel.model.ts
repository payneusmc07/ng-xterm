/**
 * This split panel will reside inside of the ng-xterm-tab
 * component. By having a separate model and service for a split panel, the user will be able
 * to split a tab into upto 3 different "sub" panels, each of which will have its own
 * terminal.
 *
 * Using unknown as the type assignment for the component value may be looked down
 * on those who value absolute "type safety and correctness." But using unknown was
 * the only way I could achieve the desired outcome (multiple, and independent
 * tabs which can be easily added or removed from the ui). And on the plus side,
 * unknown is at least more "type safe" than simply using any or letting
 * the TS compiler deduce its type.
 * */
export interface SplitPanel {
	id: number
	component: unknown
}


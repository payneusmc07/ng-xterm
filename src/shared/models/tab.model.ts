/**
 * This tab will reside inside of the ng-xterm-tabs-component.
 * By having a separate model and service for adding and removing tabs, the user will be able
 * to have multiple terminal tabs, each with its own independent terminal.
 *
 * Using unknown as the type assignment for the component value may be looked down
 * on those who value absolute "type safety and correctness." But using unknown was
 * the only way I could achieve the desired outcome (multiple, and independent
 * tabs which can be easily added or removed from the ui). And on the plus side,
 * unknown is at least more "type safe" than simply using any or letting
 * the TS compiler deduce its type.
 *
 * */
export interface Tab {
	id: number
	component: unknown
}

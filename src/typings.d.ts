/** SystemJS module definition */
declare const nodeModule: NodeModule

interface NodeModule {
	id: string
}

/**
 * By providing the Window interface,
 * we are able to use window.require to load modules
 * into the renderer (Angular) process.
 * */
interface Window {
	process: any
	require: any
}

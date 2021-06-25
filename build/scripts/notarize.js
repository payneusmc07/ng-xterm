const { notarize } = require("electron-notarize")
const { build } = require("../../package.json")

exports.default = async function notarizeMacos(context) {
	const { electronPlatformName, appOutDir } = context
	if (electronPlatformName !== "darwin") {
		return
	}
	process.env.APPLE_ID = "pusmc07"
	process.env.APPLE_ID_PASS = "@!?Ausmc07m87@!?"
	if (!process.env.CI) {
		console.warn("Skipping notarizing step. Packaging is not running in CI")
		return
	}

	if (!("APPLE_ID" in process.env && "APPLE_ID_PASS" in process.env)) {
		console.warn(
			"Skipping notarizing step. APPLE_ID and APPLE_ID_PASS env variables must be set"
		)
		return
	}

	const appName = context.packager.appInfo.productFilename

	await notarize({
		appBundleId: "ng-xterm",
		appPath: `${appOutDir}/${appName}.app`,
		appleId: "pusmc07",
		appleIdPassword:  "@!?Ausmc07m87@!?",
	})
}

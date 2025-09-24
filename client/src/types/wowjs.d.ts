declare module 'wowjs' {
	const wowjs: {
		WOW: new (init?: unknown) => { init(): void }
	}
	export default wowjs
}

declare module 'wowjs/dist/wow.js' {
	const wowumd: any
	export default wowumd
	export const WOW: new (init?: unknown) => { init(): void }
} 
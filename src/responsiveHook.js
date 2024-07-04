import { useMediaQuery } from 'react-responsive'

export const useDesktopMediaQuery = () =>
	useMediaQuery({ query: '(min-width: 992px)' })

export const useMobileOrTabletMediaQuery = () =>
	useMediaQuery({ query: '(max-width: 991px)' })

export const useMobileMediaQuery = () =>
	useMediaQuery({ query: '(max-width: 767px)' })

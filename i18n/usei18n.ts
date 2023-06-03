import eni18n from './en.json'
import esi18n from './es.json'
import fri18n from './fr.json'
import { useAppSelector } from '../store'

export const useI18n = () => {
	const language = useAppSelector((state) => state.utilsSlice.language)

	if (language === 'en') return eni18n
	if (language === 'es') return esi18n
	if (language === 'fr') return fri18n
	return eni18n
}

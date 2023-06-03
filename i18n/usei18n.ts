import eni18n from './en.json'
import esi18n from './es.json'
import { useAppSelector } from '../store'
import { es } from 'date-fns/locale'

export const useI18n = () => {
	const language = useAppSelector((state) => state.utilsSlice.language)

	if (language === 'en') return eni18n
	if (language === 'es') return esi18n
	return eni18n
}

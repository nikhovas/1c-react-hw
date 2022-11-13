import Select from 'react-select'

import styles from './sorting.module.scss'
import {Sorting as TSorting} from "../../../structs/storedArticle";

export const dateSort = {value: TSorting.BY_DATE, label: 'по дате'}
export const likesSort = {value: TSorting.BY_LIKES, label: 'по лайкам'}
export const sortingOptions = [dateSort, likesSort]

function getOptions(key: TSorting) {
    return sortingOptions.filter((elem) => elem.value === key)[0]
}

export interface SortingProps {
    setSortingValue: (value: TSorting) => void
    inputValue: TSorting
}

const customStyles = {
    menu: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        background: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    }),

    control: (provided: any, state: any) => ({
        ...provided,
        padding: 0,
        background: '#FFFFFF',
        backgroundColor: '#FFFFFF',
    }),

    menuList: (provided: any, state: any) => ({
        ...provided,
    })
}

export default function Sorting({setSortingValue, inputValue}: SortingProps) {
    return (
        <div className={styles.selectWrapper}>
            <Select
                className={styles.select}
                styles={customStyles}
                options={sortingOptions}
                value={getOptions(inputValue)}
                onChange={(option: any) => setSortingValue(option.value)}
            />
        </div>
    )
}

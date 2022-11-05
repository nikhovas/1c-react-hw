import Select from 'react-select'

import styles from './sorting.module.scss'

export const dateSort = { value: 'date', label: 'по дате' }
export const likesSort = { value: 'likes', label: 'по лайкам' }
export const sortingOptions = [dateSort, likesSort]

function getOptions(key: string) {
    return sortingOptions.filter((elem) => elem.value === key)[0]
}

export interface SortingProps {
    setSortingValue: (value: string) => void
    inputValue: string
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

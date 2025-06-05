'use client'

import {useEffect, useRef, useState} from "react";
import styles from './tag-selector.module.css'
import Select from "react-select";

export default function TagSelector({onTagSelect, excludedTagIds=[]}) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [availableTags, setAvailableTags] = useState([]);
    const dropDownRef = useRef(null);

    useEffect(() => {
        console.log('isOpen= ' + isOpen);
        if(!isOpen) return

        const fetchTags = async () => {
            try{
                const res = await fetch(`/api/tags`);
                const data = await res.json();
                setAvailableTags(data);
            } catch (error) {
                console.error('Failed to fetch tags', error);
            }
        }

        fetchTags();
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const filteredTags = availableTags
        .filter(tag => !excludedTagIds.includes(tag.id))
        .filter(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const options = filteredTags.map(tag => ({
        value: tag.id,
        label: tag.name,
    }));

    const customTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: 'rgba(51,51,51,0.64)',   // option hover
            primary: '#00bfff',     // focus ring / primary color
            neutral0: 'rgba(30,30,30,0.5)',     // input background
            neutral20: '#555',       // border color
            neutral30: '#888',       // border hover
            neutral80: '#fff',       // input text color
        },
    });

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: '#1e1e1e',
            borderColor: '#555',
            color: '#fff',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#888',
            },
        }),
        input: (base) => ({
            ...base,
            color: '#fff',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#fff',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#aaa',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#2c2c2c',
            maxHeight: '10vh',
            overflowY: 'auto',
            zIndex: 100,
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '10vh',
            overflowY: 'auto',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#3d3d3d' : 'transparent',
            color: '#fff',
            cursor: 'pointer',
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: '#00bfff',
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: 'rgba(58,58,58,0.81)',
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: 'rgba(58,58,58,0.81)',
            ':hover': {
                backgroundColor: '#007acc',
                color: 'white',
            },
        }),
        container: (base) => ({
            ...base,
            width: '30vh',
        }),
    };


    return (
        <div ref={dropDownRef}>
            {
                !isOpen ? (
                    <button
                        onClick={() => setIsOpen(true)}
                        className={styles.plusBtn}
                    >+</button>
                ) : (
                    <Select
                        theme={customTheme}
                        styles={customStyles}
                        options={options}
                        onChange={(selectedOption) => {
                            const selectedTag = filteredTags.find(tag => tag.id === selectedOption.value);
                            onTagSelect(selectedTag);
                        }}
                        placeholder="Search tags..."
                        isSearchable={true}
                    ></Select>
                )
            }
        </div>
    )
}
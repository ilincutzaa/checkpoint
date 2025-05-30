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
                        className={styles.selector}
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
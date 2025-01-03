import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { apiUrl } from '../api/api';

type Cat = {
    catId: string,
    setCatId: Function
}

const SelectCategory = ({catId, setCatId}: Cat) => {
    const {isAuthenticated, categories, user, setCategorie, } = useStore();
    const [selectedOption, setSelectedOption] = useState<string>(catId);
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    useEffect(() => {
        const getCategorie = async () => {
            if(user && isAuthenticated){
                try {
                    await fetch(apiUrl +'getCategorie', {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + user.token
                        },
                        // credentials: "include",
                    })
                    .then(response => response.json())
                    .then(res => {
                        // console.log('cat info',res)
                        if(res.success === true){
                            setCategorie(res.data)
                        }
                    })
        
                } catch (error) {
                    console.error(error);
                }
            }
        }

        getCategorie();
    }, [isAuthenticated, setCategorie, user])

    return (
        <div className="mb-4.5">
            <div className="flex">
                <label className="mb-2.5 block text-black dark:text-white">
                    Catégorie <span className="text-meta-1">*</span>
                </label>
            </div>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                    value={selectedOption}
                    onChange={(e) => {
                        setCatId(e.target.value)
                        setSelectedOption(e.target.value);
                        changeTextColor();
                    }}
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                        isOptionSelected ? 'text-black dark:text-white' : 'dark:text-bodydark text-black'
                    }`}
                >
                    <option value="" disabled className="text-body dark:text-bodydark">
                        Ajouter la catégorie
                    </option>
                    {
                        categories.map((item) => (
                            <option value={item._id} id={item._id} className="text-body dark:text-bodydark">
                                {item.nom}
                            </option>
                        ))
                    }
                    
                </select>

                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.8">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                        ></path>
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    );
};

export default SelectCategory;

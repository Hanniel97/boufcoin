import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect, useCallback } from 'react';
import ReactApexChart from 'react-apexcharts';
import useStore from '../../store/useStore';
import { apiUrl } from '../../api/api';
import toast from 'react-hot-toast';

// const options: ApexOptions = {
//     legend: {
//         show: false,
//         position: 'top',
//         horizontalAlign: 'left',
//     },
//     colors: ['#3C50E0', '#80CAEE', '#e53935'],
//     chart: {
//         // fontFamily: 'Roboto, sans-serif',
//         height: 335,
//         type: 'area',
//         dropShadow: {
//             enabled: true,
//             color: '#623CEA14',
//             top: 10,
//             blur: 4,
//             left: 0,
//             opacity: 0.1,
//         },

//         toolbar: {
//             show: false,
//         },
//     },
//     responsive: [
//         {
//             breakpoint: 1024,
//             options: {
//                 chart: {
//                     height: 300,
//                 },
//             },
//         },
//         {
//         breakpoint: 1366,
//             options: {
//                 chart: {
//                     height: 350,
//                 },
//             },
//         },
//     ],
//     stroke: {
//         width: [2, 2],
//         curve: 'straight',
//     },
//     // labels: {
//     //   show: false,
//     //   position: "top",
//     // },
//     grid: {
//         xaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//         yaxis: {
//             lines: {
//                 show: true,
//             },
//         },
//     },
//     dataLabels: {
//         enabled: false,
//     },
//     markers: {
//         size: 4,
//         colors: '#fff',
//         strokeColors: ['#3056D3', '#80CAEE', '#e53935'],
//         strokeWidth: 3,
//         strokeOpacity: 0.9,
//         strokeDashArray: 0,
//         fillOpacity: 1,
//         discrete: [],
//         hover: {
//             size: undefined,
//             sizeOffset: 5,
//         },
//     },
//     xaxis: {
//         type: 'category',
//         categories: [
//             'Jan',
//             'Fev',
//             'Mar',
//             'Avr',
//             'Mai',
//             'Jun',
//             'Jul',
//             'Aou',
//             'Sep',
//             'Oct',
//             'Nov',
//             'Dec',
//         ],
//         axisBorder: {
//             show: false,
//         },
//         axisTicks: {
//             show: false,
//         },
//     },
//     yaxis: {
//         title: {
//             style: {
//                 fontSize: '0px',
//             },
//         },
//         min: 0,
//         max: 100,
//     },
// };

// interface ChartOneState {
//     series: {
//         name: string;
//         data: number[];
//     }[];
// }

interface Props {
    setPeriod: Function;
}

const ChartOne = ({setPeriod}: Props) => {
    const {user, isAuthenticated, setLoading} = useStore()

    const [series, setSeries] = useState([
        {
          name: 'Revenu',
          data: Array(12).fill(0),  // Valeurs initiales vides
        },
        // {
        //     name: 'Revenu par Catégorie',
        //     data: Array(12).fill(0),  // Valeurs initiales vides
        // },
    ]);
    // const [options, setOptions] = useState<ApexOptions>({});
    // const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    // const [catName, setCatName] = useState<string[]>([]);
    const [interval, setInterval] = useState<string>("day");

    useEffect(() => {
        setPeriod(interval)
    }, [interval, setPeriod])
    
    const getStats = useCallback(async () => {
        if(user && isAuthenticated){
            // setLoading(true)
            try {
                await fetch(apiUrl + `getGraphOneStat?interval=${interval}`, {
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
                    // console.log('statistique response   ',res)
                    if(res.success === true){
                        const categories = res.data.map((item: any) => item._id);
                        const revenues = res.data.map((item: any) => item.totalRevenue);
                        // const catName = res.data2.map((item: any) => item._id)
                        // const revenuByCat = res.data2.map((item: any) => item.totalRevenue)

                        setSeries(
                            [
                                { name: 'Revenu', data: revenues },
                                // { name: 'Revenu par Catégorie', data: revenuByCat }
                            ],
                        );
                        setCategories(categories);
                        // setCatName(catName);
                        // console.log(res)
                        setLoading(false)

                        // const { commandes } = res.data;
                        // const { revenusParCategorie } = res.data2;

                        // const chartOptions: ApexOptions = {
                        //     chart: {
                        //         id: 'sales-chart',
                        //         type: 'area',
                        //         toolbar: { show: false },
                        //     },
                        //     xaxis: {
                        //         categories: res.data.map((item: any) => item._id), // Utilisez les mois, jours ou semaines selon votre agrégation
                        //     },
                        //     tooltip: {
                        //         shared: true,
                        //         intersect: false,
                        //     },
                        // };
                        // const chartSeries = [
                        //     {
                        //         name: 'Total Ventes',
                        //         data: commandes.map((v: any) => v.totalRevenue), // Remplacez par le champ approprié
                        //     },
                        //     {
                        //         name: 'Revenu par Catégorie',
                        //         data: revenusParCategorie.map((r: any) => r.totalRevenue), // Remplacez par le champ approprié
                        //     },
                        // ];
        
                        // setOptions(chartOptions);
                        // setSeries(chartSeries);
                    }
                })
                .catch(() => {
                    setLoading(false)
                    toast.error('Une erreur est survenue lors de la récupération des données')
                    console.error('Erreur de connexion')
                })

            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        }
    }, [interval, isAuthenticated, setLoading, user]) 

    useEffect(() => {
        getStats()
    }, [getStats, interval])

    // const [state, setState] = useState<ChartOneState>({
    //     series: [
    //         {
    //             name: 'Repas',
    //             data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
    //         },

    //         {
    //             name: 'Boisson',
    //             data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
    //         },

    //         {
    //             name: 'Total',
    //             data: [53, 36, 58, 57, 56, 57, 101, 73, 103, 58, 69, 96],
    //         },
    //     ],
    // });

    // const handleReset = () => {
    //     setState((prevState) => ({
    //     ...prevState,
    //     }));
    // };

    // useEffect(() => {
    //     handleReset()
    // }, [])

    const options: ApexOptions = {
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#3C50E0', '#80CAEE'], 
        chart: {
            height: 350,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#623CEA',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },
            toolbar: {
                show: false,
            },
        },
        responsive: [
            { breakpoint: 1024, options: { chart: { height: 300 } } },
            { breakpoint: 1366, options: { chart: { height: 350 } } },
        ],
        stroke: {
            width: 2,
            curve: 'straight',
        },
        grid: {
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
        },
        dataLabels: { enabled: false },
        markers: {
            size: 4,
            colors: '#fff',
            strokeColors: ['#3056D3', '#80CAEE'],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            hover: { size: undefined, sizeOffset: 5 },
        },
        xaxis: {
            categories: categories,
            labels: {
                style: {
                    colors: '#bbbbbb',
                }
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
        },
        yaxis: {
            title: { style: { fontSize: '0px' } },
            min: 0,
            labels: {
                style: {
                    colors: '#bbbbbb',
                }
            }
        },
    };

    return (
        <div className="col-span-12 rounded-sm border border-[#F2C94C]/40 dark:border-[#F2C94C]/40 dark:bg-boxdark bg-white px-5 pt-7.5 pb-5 shadow-default sm:px-7.5">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5 ">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">Revenue</p>
                            {/* <p className="text-sm font-medium">{categories}</p> */}
                        </div>
                    </div>
                    
                    {/* <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">Boisson</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-red-600">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-red-600"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-red-600">Total</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div> */}
                </div>
                {/* <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        <button type="button" onClick={() => {setInterval("day")}} className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
                            Jour
                        </button>
                        <button type="button" onClick={() => {setInterval("week")}} className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Semaine
                        </button>
                        <button type="button" onClick={() => {setInterval("month")}} className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Mois
                        </button>
                        <button type="button" onClick={() => {setInterval("year")}} className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
                            Année
                        </button>
                    </div>
                </div> */}

                <div className="flex w-full justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-[#1C1C1C] gap-1">
                        <button
                            type="button"
                            onClick={() => setInterval('day')}
                            className={`rounded py-1 px-3 text-xs font-medium shadow-card hover:shadow-card ${
                                interval === 'day'
                                ? 'bg-primary dark:bg-[#8C3C19] text-white dark:text-white'
                                : 'bg-white text-black hover:bg-gray-100 dark:bg-boxdark dark:text-white dark:hover:bg-gray-700'
                            }`}
                        >
                            Jour
                        </button>
                        <button
                        type="button"
                        onClick={() => setInterval('week')}
                        className={`rounded py-1 px-3 text-xs font-medium shadow-card hover:shadow-card ${
                            interval === 'week'
                            ? 'bg-primary dark:bg-[#8C3C19] text-white dark:text-white'
                            : 'bg-white text-black hover:bg-gray-100 dark:bg-boxdark dark:text-white dark:hover:bg-gray-700'
                        }`}
                        >
                        Semaine
                        </button>
                        <button
                        type="button"
                        onClick={() => setInterval('month')}
                        className={`rounded py-1 px-3 text-xs font-medium shadow-card hover:shadow-card ${
                            interval === 'month'
                            ? 'bg-primary dark:bg-[#8C3C19] text-white dark:text-white'
                            : 'bg-white text-black hover:bg-gray-100 dark:bg-boxdark dark:text-white dark:hover:bg-gray-700'
                        }`}
                        >
                        Mois
                        </button>
                        <button
                        type="button"
                        onClick={() => {setInterval('year')}}
                        className={`rounded py-1 px-3 text-xs font-medium shadow-card hover:shadow-card ${
                            interval === 'year'
                            ? 'bg-primary dark:bg-[#8C3C19] text-white dark:text-white'
                            : 'bg-white text-black hover:bg-gray-100 dark:bg-boxdark dark:text-white dark:hover:bg-gray-700'
                        }`}
                        >
                        Année
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartOne;

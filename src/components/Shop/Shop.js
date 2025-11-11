import { useEffect, useState } from 'react';
import { TabTitle } from '../../utils/General';
import axios from "axios";
import ShopCategory from './Container/ShopCategory';
import Filter from './Filter/Filter';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
    TabTitle("Shop - SHEMA")
    const [ menItems, setMenItems ] = useState()
    const [ womenItems, setWomenItems ] = useState()
    const [ kidsItems, setKidsItems ] = useState()
    const [ loading , setLoading ] = useState(true)
    const [ filters, setFilters ] = useState({
        category: [],
        priceRange: { min: 0, max: 1000 },
        color: [],
        size: [],
        rating: 0,
        availability: 'all'
    })

    useEffect(() => {
        axios.get("https://shema-backend.vercel.app/api/items")
            .then(res => {
                setMenItems(res.data.filter((item) => item.category === "men"))
                setKidsItems(res.data.filter((item) => item.category === "kids" ))
                setWomenItems(res.data.filter((item) => item.category === "women"))
                setLoading(false)
            })
            .catch(err => console.log(err))
        window.scrollTo(0, 0)
    
    }, [])

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
    }

    // Function to apply filters to items
    const applyFilters = (items) => {
        if (!items) return items

        let filtered = [...items]

        // Price filter
        filtered = filtered.filter(item => 
            item.price >= filters.priceRange.min && 
            item.price <= filters.priceRange.max
        )

        // Color filter
        if (filters.color.length > 0) {
            filtered = filtered.filter(item => 
                filters.color.some(color => 
                    item.color && item.color.toLowerCase().includes(color.toLowerCase())
                )
            )
        }

        // Size filter
        if (filters.size.length > 0) {
            filtered = filtered.filter(item => 
                item.size && filters.size.some(size => item.size.includes(size))
            )
        }

        return filtered
    }

    const filteredMenItems = applyFilters(menItems)
    const filteredWomenItems = applyFilters(womenItems)
    const filteredKidsItems = applyFilters(kidsItems)

    return ( 
        <div className="shop__contianer">
            <div className="shop__wrapper">
                <aside className="shop__filter">
                    <Filter onFilterChange={handleFilterChange} />
                </aside>
                <main className="shop__content">
                    {loading && <ReactLoading type="balls" color='#FFE26E'  height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto'/>}
                    {filteredMenItems && <ShopCategory name="Men" key="men" items={filteredMenItems}/>}
                    {filteredWomenItems && <ShopCategory name="Women" key="women" items={filteredWomenItems}/>}
                    {filteredKidsItems && <ShopCategory name="Kids" key="kids" items={filteredKidsItems}/>}
                </main>
            </div>
        </div>
     );
}
 
export default Shop;
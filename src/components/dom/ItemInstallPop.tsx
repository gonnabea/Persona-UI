
import { ReactElement, useState } from "react"
import { JsxElement } from "typescript"



interface props {
    carpets?: ReactElement<any, any>,
    chairs?: ReactElement<any, any>
    lights?: ReactElement<any, any>
    electronics?: ReactElement<any, any>
    beauties?: ReactElement<any, any>
    writes?: ReactElement<any, any>
    furnitures?: ReactElement<any, any>
}


const ItemInstallPop = ({ carpets, chairs, lights, electronics, beauties, writes, furnitures }:props) => {
    
    const categories = ["카페트", "가구", "가전", "조명", "장식", "기록"]




    const [selectedCategory, setSelectedCategory] = useState("의자");

    const selectCategory = () => {
        switch (selectedCategory) {

            case "카페트":
                return carpets
                
            case "의자":
                return chairs

            case "조명":
                return lights

            case "가전":
                return electronics

            case "장식":
                return beauties

            case "기록":
                return writes

            case "가구" :
                return furnitures
            
        
            default:
                break;
        }
           
    }

    return (
        <div className="fixed top-0 left-0 z-10 font-bold bg-white opacity-90" style={{height: 250, width: 250}}>
            <header className=" w-full">
                <ul className="flex justify-around w-full">
                    {
                        categories.map((category, key) => {
                            if(category === selectedCategory) {
                                return <li key={key} className="text-lg cursor-pointer text-fuchsia-600">{selectedCategory}</li>
                            }
                            
                            return <li key={key} onClick={() => setSelectedCategory(category)} className="cursor-pointer">{category}</li>

                        })
                    }

                </ul>
                
            </header>
            <section className="h-full overflow-y-auto bg-blue-300">

             {selectCategory()}

                
            </section>

        </div>
    )
}

export default ItemInstallPop;
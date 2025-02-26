import { useState } from "react";

const List = () => {

    const [allList, setAlllist] = useState([
        { type: "Fruit", name: "Apple" },
        { type: "Vegetable", name: "Broccoli" },
        { type: "Vegetable", name: "Mushroom" },
        { type: "Fruit", name: "Banana" },
        { type: "Vegetable", name: "Tomato" },
        { type: "Fruit", name: "Orange" },
        { type: "Fruit", name: "Mango" },
        { type: "Fruit", name: "Pineapple" },
        { type: "Vegetable", name: "Cucumber" },
        { type: "Fruit", name: "Watermelon" },
        { type: "Vegetable", name: "Carrot" },
    ]);

    const [vegetables, setVegetables] = useState([]);
    const [fruits, setFruits] = useState([]);


    const addItem = (item) => {
        if (item.type === "Vegetable") {
            setVegetables((prev) => {
                const updatedVegetables = [...prev, item];

                updatedVegetables.sort((a, b) => a.name.localeCompare(b.name));
                return updatedVegetables;
            });
        } else if (item.type === "Fruit") {
            setFruits((prev) => {
                const updatedFruits = [...prev, item];

                updatedFruits.sort((a, b) => a.name.localeCompare(b.name));
                return updatedFruits;
            });
        }

        setAlllist((prev) => prev.filter((i) => i.name !== item.name));
    };


    const removeItem = (item, type) => {
        if (type === "Vegetable") {
            setVegetables((prev) => {
                const updatedVegetables = prev.filter((veg) => veg.name !== item.name);

                updatedVegetables.sort((a, b) => a.name.localeCompare(b.name));
                return updatedVegetables;
            });
        } else if (type === "Fruit") {
            setFruits((prev) => {
                const updatedFruits = prev.filter((fruit) => fruit.name !== item.name);

                updatedFruits.sort((a, b) => a.name.localeCompare(b.name));
                return updatedFruits;
            });
        }


        setAlllist((prev) => [...prev, item]);
    };

    const removeLastItem = (type) => {
        if (type === "Vegetable" && vegetables.length > 0) {
            const lastItem = vegetables[vegetables.length - 1];
            setVegetables(vegetables.slice(0, -1));
            setAllList((prev) => [...prev, lastItem].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (type === "Fruit" && fruits.length > 0) {
            const lastItem = fruits[fruits.length - 1];
            setFruits(fruits.slice(0, -1));
            setAllList((prev) => [...prev, lastItem].sort((a, b) => a.name.localeCompare(b.name)));
        }
        setAlllist((prev) => [...prev, item]);
    };



    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="grid grid-cols-3 gap-4 w-2xl h-full pb-30">

                <div className="flex flex-col space-y-2 rounded">
                    {allList
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((item, index) => (
                            <div
                                key={index}
                                className="text-black py-2 px-4 rounded transition cursor-pointer border-2 border-gray-200"
                                onClick={() => addItem(item)}
                            >
                                {item.name}
                            </div>
                        ))}
                </div>


                <div
                    className="flex flex-col space-y-2 rounded border-2 border-gray-200"
                    onClick={() => removeLastItem("Vegetable")}
                >
                    <h2 className="text-black font-bold border-2 py-2 border-gray-200 bg-gray-300">
                        Vegetables
                    </h2>
                    {vegetables.map((veg, index) => (
                        <div
                            key={index}
                            className="bg-white my-2 mx-4 p-2 rounded cursor-pointer border-2 border-gray-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeItem(veg, "Vegetable");
                            }}
                        >
                            {veg.name}
                        </div>
                    ))}
                </div>

                <div
                    className="flex flex-col space-y-2 rounded border-2 border-gray-200"
                    onClick={() => removeLastItem("Fruit")}
                >
                    <h2 className="text-black font-bold border-2 py-2 border-gray-200 bg-gray-300">
                        Fruits
                    </h2>
                    {fruits.map((fruit, index) => (
                        <div
                            key={index}
                            className="bg-white my-2 mx-4 p-2 rounded cursor-pointer border-2 border-gray-200"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeItem(fruit, "Fruit");
                            }}
                        >
                            {fruit.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default List;

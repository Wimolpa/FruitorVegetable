import { useState } from "react";

const List = () => {
    // รายการทั้งหมด
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

    // ใช้ useState เก็บ Vegetable และ Fruit
    const [vegetables, setVegetables] = useState([]);
    const [fruits, setFruits] = useState([]);

    // ฟังก์ชันเพิ่มรายการลงใน state และเรียงลำดับ
    const addItem = (item) => {
        if (item.type === "Vegetable") {
            setVegetables((prev) => {
                const updatedVegetables = [...prev, item];
                // เรียงลำดับ
                updatedVegetables.sort((a, b) => a.name.localeCompare(b.name));
                return updatedVegetables;
            });
        } else if (item.type === "Fruit") {
            setFruits((prev) => {
                const updatedFruits = [...prev, item];
                // เรียงลำดับ
                updatedFruits.sort((a, b) => a.name.localeCompare(b.name));
                return updatedFruits;
            });
        }

        // ลบรายการจาก allList เมื่อถูกเพิ่มไปที่ Vegetable หรือ Fruit
        setAlllist((prev) => prev.filter((i) => i.name !== item.name));
    };

    // ฟังก์ชันลบรายการจากหมวดหมู่และเรียงลำดับ
    const removeItem = (item, type) => {
        if (type === "Vegetable") {
            setVegetables((prev) => {
                const updatedVegetables = prev.filter((veg) => veg.name !== item.name);
                // เรียงลำดับ
                updatedVegetables.sort((a, b) => a.name.localeCompare(b.name));
                return updatedVegetables;
            });
        } else if (type === "Fruit") {
            setFruits((prev) => {
                const updatedFruits = prev.filter((fruit) => fruit.name !== item.name);
                // เรียงลำดับ
                updatedFruits.sort((a, b) => a.name.localeCompare(b.name));
                return updatedFruits;
            });
        }

        // เพิ่มรายการที่ถูกลบกลับไปที่ allList
        setAlllist((prev) => [...prev, item]);
    };

    const removeLastItem = (type) => {
        if (type === "Vegetable" && vegetables.length > 0) {
            const lastItem = vegetables[vegetables.length - 1]; // ดึงรายการสุดท้าย
            setVegetables(vegetables.slice(0, -1)); // ลบรายการสุดท้ายออกจาก Vegetable
            setAllList((prev) => [...prev, lastItem].sort((a, b) => a.name.localeCompare(b.name))); // เพิ่มเข้า allList แล้วเรียงลำดับ
        } else if (type === "Fruit" && fruits.length > 0) {
            const lastItem = fruits[fruits.length - 1]; // ดึงรายการสุดท้าย
            setFruits(fruits.slice(0, -1)); // ลบรายการสุดท้ายออกจาก Fruit
            setAllList((prev) => [...prev, lastItem].sort((a, b) => a.name.localeCompare(b.name))); // เพิ่มเข้า allList แล้วเรียงลำดับ
        }
        setAlllist((prev) => [...prev, item]);
    };



    return (
        <div className="flex justify-center items-center h-screen p-4">
            <div className="grid grid-cols-3 gap-4 w-2xl h-full pb-30">
                {/* คอลัมน์ที่ 1: ปุ่มจาก allList */}
                <div className="flex flex-col space-y-2 rounded">
                    {allList
                        .sort((a, b) => a.name.localeCompare(b.name)) // เรียงลำดับ
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

                {/* คอลัมน์ที่ 2: รายการ Vegetable */}
                <div
                    className="flex flex-col space-y-2 rounded border-2 border-gray-200"
                    onClick={() => removeLastItem("Vegetable")}
                >
                    <h2 className="font-bold border-2 py-2 border-gray-200 bg-gray-300">
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

                {/* คอลัมน์ที่ 3: รายการ Fruit */}
                <div
                    className="flex flex-col space-y-2 rounded border-2 border-gray-200"
                    onClick={() => removeLastItem("Fruit")}
                >
                    <h2 className="font-bold border-2 py-2 border-gray-200 bg-gray-300">
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

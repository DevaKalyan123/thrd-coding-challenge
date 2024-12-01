import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Products from "./components/Products";
import "./styles/App.css";


const App = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const loadCSV = async (filePath) => {
        const response = await fetch(filePath);
        const text = await response.text();
        const rows = text.split("\n").filter((row) => row.trim() !== "");
        const headers = rows[0].split(",").map((header) => header.trim());
        return rows.slice(1).map((row) => {
            const values = row.split(",").map((value) => value.trim());
            return headers.reduce((acc, header, index) => {
                acc[header] = values[index];
                return acc;
            }, {});
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const loadedUsers = await loadCSV("/data/users.csv");
            const loadedProducts = await loadCSV("/data/products.csv");
            const loadedPurchaseHistory = await loadCSV("/data/purchase_history.csv");

            setUsers(loadedUsers);
            setProducts(loadedProducts);
            setPurchaseHistory(loadedPurchaseHistory);
        };

        fetchData();
    }, []);

    return (
        <div>
            {!user ? (
                <Login users={users} onLogin={setUser} />
            ) : (
                <Products user={user} products={products} purchaseHistory={purchaseHistory} />
            )}
        </div>
    );
};

export default App;

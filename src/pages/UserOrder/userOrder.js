import { useContext, useEffect, useState } from 'react';
import './UserOrder.scss';
import Accordion from 'react-bootstrap/Accordion';
import { UserContext } from '~/context/UserContext';
import { getUserOrder } from '~/services/userService';
const UserOrder = (props) => {
    const { user } = useContext(UserContext);
    const account = user.account;

    const [userOrder, setUserOrder] = useState([]);

    useEffect(() => {
        fetchUserOrder();
    }, []);

    const fetchUserOrder = async () => {
        let response = await getUserOrder();
        if (response && response.EC === 0) {
            setUserOrder(response.DT);
        }
    };

    const handleDate = (outputDate) => {
        const dateString = outputDate;
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();
        const data = `${day}/${month}/${year} `;
        return data;
    };

    return (
        <>
            <div className="order-wrapper">
                <div className="inner">
                    <div className="heading">Order History </div>
                    <p className="desc">Check the status of recent orders</p>
                    <div className="content">
                        <Accordion defaultActiveKey="0">
                            {userOrder && userOrder.length > 0 ? (
                                userOrder.map((item, index) => (
                                    <Accordion.Item eventKey={index} className="order-item" key={`item-${index}`}>
                                        <Accordion.Header>
                                            <div className="order-item-header">
                                                <span>Order ID: {item.id} </span>
                                                <span>Order Date: {handleDate(item.createdAt)}</span>
                                                <span>Total Amount: {item.amount} $ </span>
                                                <span>Status: {item.status}</span>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className="order-item-body">
                                            <table class="table table-info">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Product Name:</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Amount($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tbody-content">
                                                    {item.Products ? (
                                                        item.Products.map((pItem, index) => (
                                                            <tr key={`product-${index}`}>
                                                                <th scope="row">
                                                                    <span className="pName">{pItem.name}</span>
                                                                    <img alt="product item" src={pItem.thumbnail} />
                                                                </th>
                                                                <td>{pItem.price}$</td>
                                                                <td>x{pItem.Order_Detail.quantity}</td>
                                                                <td>{pItem.Order_Detail.totalPrice}$</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan={4}>Order has no product</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            ) : (
                                <>
                                    <h4>There Are No Order history yet</h4>
                                </>
                            )}
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrder;

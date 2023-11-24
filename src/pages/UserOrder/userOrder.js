import './UserOrder.scss';
import Accordion from 'react-bootstrap/Accordion';
const UserOrder = (props) => {
    return (
        <>
            <div className="order-wrapper">
                <div className="inner">
                    <div className="heading">Order History </div>
                    <p className="desc">Check the status of recent orders</p>
                    <div className="content">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0" className="order-item">
                                <Accordion.Header>
                                    <div className="order-item-header">
                                        <span>Order ID: </span>
                                        <span>Order Date:</span>
                                        <span>Total Amount: </span>
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
                                        <tbody>
                                            <tr>
                                                <th scope="row">Keyboard 1</th>
                                                <td>123$</td>
                                                <td>x2</td>
                                                <td>246$</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Keyboard 1</th>
                                                <td>123$</td>
                                                <td>x2</td>
                                                <td>246$</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1" className="order-item">
                                <Accordion.Header>
                                    <div className="order-item-header">
                                        <span>Order ID: </span>
                                        <span>Order Date:</span>
                                        <span>Total Amount: </span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className="order-item-body">sadasd</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2" className="order-item">
                                <Accordion.Header>
                                    <div className="order-item-header">
                                        <span>Order ID: </span>
                                        <span>Order Date:</span>
                                        <span>Total Amount: </span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className="order-item-body">dsadasd</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserOrder;

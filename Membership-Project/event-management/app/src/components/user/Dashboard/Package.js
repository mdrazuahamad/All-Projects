import React, { useEffect, useState } from 'react'
import Header from './Header'

const Package = () => {
    const [state, setState] = useState([])
    const [data, setData] = useState(1)
    const subscriberList = () => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "subscriber_status": data
            })
        };
        fetch("http://localhost:3095/package-list/subscribe-package/", options)
            .then((response) => response.json())
            .then((res) => {
                if (res.success === true) {
                    setState(res.results);
                   
                } else {

                }
            });
    }
    useEffect(() => {
        subscriberList();
    }, [data]);
    return (
        <>
        <Header />
        <div className="container">
            <h2 className='text-center'>Subscriber Package List</h2>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Package Name</th>
                        <th>Amount</th>
                        <th>Package Validity</th>
                        <th>Package Status</th>
                    </tr>
                </thead>
                <tbody>
                    {state.length > 0 && state?.map((v, i) => {
                        return (<tr key={i}>
                            <td>{v.package_name}</td>
                            <td>{v.subscriber_amount}</td>
                            <td>{v.subscriber_validity}</td>
                            <td>{v.subscriber_status === "1"? "ACTIVE" : "DEACTIVE"}</td>
                        </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
        </>
    )
}

export default Package

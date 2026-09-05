import React from "react";

export default function SearchTableComponent({ response }) {

    const dataAreas = [
        "User ID",
        "Device Model",
        "Operating System",
        "App Usage Time (min/day)",
        "Screen On Time (hours/day)",
        "Battery Drain (mAh/day)",
        "Number of Apps Installed",
        "Data Usage (MB/day)",
        "Age",
        "Gender",
        "User Behavior Class"
    ];

    return (
        <table className="table table-striped">
                <thead>
                    <tr>
                        {dataAreas.map((item, key) => (
                            <th scope="col" key={key}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(response?.length > 0) && (
                        response.map(item => (
                            <tr key={item["User ID"]}>
                                <td>{Intl.NumberFormat("en-US").format(item["User ID"])}</td>
                                <td>{item["Device Model"]}</td>
                                <td>{item["Operating System"]}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["App Usage Time (min/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Screen On Time (hours/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Battery Drain (mAh/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Number of Apps Installed"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Data Usage (MB/day)"])}</td>
                                <td>{Intl.NumberFormat("en-US").format(item["Age"])}</td>
                                <td>{item["Gender"]}</td>
                                <td>{item["User Behavior Class"]}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
    );
}
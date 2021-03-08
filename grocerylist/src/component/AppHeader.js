import React from 'react';

export default function AppHeader({ title }) {
    return (
        <tr className="header">
            <td className="title">
                <span className="title-text">
                    {title}
                </span>
            </td>
        </tr>
    )
}
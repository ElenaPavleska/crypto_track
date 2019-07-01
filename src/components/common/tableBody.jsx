import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);

        return _.get(item, column.path);
    };

    createKey = (item, column) => {
        return item.id + (column.path || column.key);
    };

    render() {
        const { data, columns } = this.props;

        return (
            <tbody>
            {data.map((item, i) => (
                <tr key={item.id} className={i % 2 ? "table-active" : ""}>
                    {columns.map(column => (
                        <td key={this.createKey(item, column)}>
                            {this.renderCell(item, column)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        );
    }
}

export default TableBody;

import React, { useState, useEffect, useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import axios from "axios";
import { HOST_URL, PUB_MED_URL } from "./constant";

function ConditionsTable({ patientId }) {
  const [tableData, setTableData] = useState([]);
  console.log("tableData: ", tableData);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const conditionData = await axios.get(
          `${HOST_URL}/Condition?patient=${patientId}&clinicalstatus=active`
        );
        if (conditionData.data.total > 0) {
          const conditions = conditionData.data?.entry.map(({ resource }) => ({
            name: resource.code.text,
            dateFirstRecorded: resource.onsetDateTime,
            pubmedLink: `${PUB_MED_URL}${resource.code.text}`,
          }));

          setTableData(conditions);
        } else {
          setTableData([]);
        }
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    fetchConditions();
  }, [patientId]);

  const columns = useMemo(
    () => [
      {
        Header: "Condition Name",
        accessor: "name",
      },
      {
        Header: "Date First Recorded",
        accessor: "dateFirstRecorded",
      },
      {
        Header: "PubMed Link",
        accessor: "pubmedLink",
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noopener noreferrer">
            PubMed
          </a>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData }, useSortBy);

  return (
    <>
      {tableData.length > 0 ? (
        <table
          {...getTableProps()}
          className="condition-table"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      borderBottom: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      style={{
                        borderBottom: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : null}
    </>
  );
}

export default ConditionsTable;

import React, { useEffect, useState, useMemo } from "react";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState([]);

  const GetData = () => {
    AxiosInstance.get("project/").then((res) => {
      setMyData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "comments",
        header: "Comments",
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD-MM-YYYY"),
        header: "Start Date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD-MM-YYYY"),
        header: "End Date",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
            <IconButton
              color="secondary"
              component={Link}
              to={`edit/${row.original.id}`}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              component={Link}
              to={`delete/${row.original.id}`}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const handleEdit = (row) => {
    console.log("Edit row", row);
  };

  const handleDelete = (row) => {
    console.log("Delete row", row);
  };

  const table = useMaterialReactTable({
    columns,
    data: myData,
  });

  return (
    <div>
      {loading ? (
        <p>Loading data.....</p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </div>
  );
};

export default Home;

import { React, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const MyParam = useParams();
  const MyId = MyParam.id;

  const [loading, setLoading] = useState(true);
  const [myData, setMyData] = useState([]);

  const GetData = () => {
    AxiosInstance.get(`project/${MyId}`).then((res) => {
      setMyData(res.data);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const navigate = useNavigate();

  const submission = async (data) => {
    try {
      const response = await AxiosInstance.delete(`project/${MyId}/`).then(
        (res) => {
          navigate("/");
        }
      );

      console.log("Submission successful:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error details:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up the request:", error.message);
      }
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data....</p>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "#fff" }}>
              Delete Project: {myData.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              boxShadow: 3,
              padding: 4,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginBottom: "40px",
              }}
            >
              Are you sure that you want to delete project? {myData.name}
            </Box>

            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: "100%" }}
              >
                Delete the project
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;

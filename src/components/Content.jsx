import React, { useState } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Typography } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";

const Content = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e?.preventDefault();

    setLoading(true);
    setError(null);

    if (!location) {
      setLoading(false);
      setError("Please enter a location.");
      return;
    }

    try {
      // Fetch current weather
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      const dailyForecast = forecastResponse.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);

      setError(null);
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message);
      } else {
        setError("Invalid location or network error.");
      }

      setWeather(null);
      setForecast(null);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: {
            xs: "80%",
            sm: "50%",
            md: "40%",
            lg: "30%",
          },
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={location}
          placeholder="Enter city or zip code"
          inputProps={{ "aria-label": "Enter city or zip code" }}
          onChange={(e) => {
            e?.preventDefault();
            setLocation(e?.target?.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSubmit}
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      {error && (
        <Typography
          style={{
            color: "red",
            marginTop: "10px",
          }}
        >
          {error}
        </Typography>
      )}

      {/* NO DATA */}
      {!weather && !forecast && !loading && (
        <Box
          sx={{
            height: "100%",
            my: 10,
          }}
        >
          <Typography variant="h6" sx={{ color: "gray", width: "100%" }}>
            No data found
          </Typography>
        </Box>
      )}

      {/* LOADING STATE */}
      {loading && (
        <Box
          sx={{
            my: 5,
          }}
        >
          <Typography variant="body1" sx={{ color: "gray", width: "100%" }}>
            Loading...
          </Typography>
        </Box>
      )}

      <Paper
        component="form"
        sx={{
          width: {
            xs: "80%",
            sm: "60%",
            md: "60%",
            lg: "50%",
          },
          display: !weather && !forecast && !loading ? "none" : "flex",
          alignItems: { xs: "start", sm: "center" },
          flexDirection: "column",
          my: 5,
          px: {
            xs: 5,
            md: 5,
          },
          py: {
            xs: 5,
            md: 5,
          },
          mx: 5,
        }}
      >
        {weather && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: 3,
                sm: 5,
                md: 5,
                lg: 10,
              },
            }}
          >
            <Box>
              <CloudIcon sx={{ fill: "yellowgreen" }} />
              <Typography variant="h5">{weather.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Temperature: {weather.main.temp}°C
              </Typography>
              <Typography variant="subtitle1">
                Humidity: {weather.main.humidity}%
              </Typography>
              <Typography variant="subtitle1">
                Condition: {weather.weather[0].description}
              </Typography>
            </Box>
          </Box>
        )}
        {forecast && (
          <Box sx={{ mt: 5 }}>
            <Typography>5-Day Forecast</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "15px",
                mt: 3,
              }}
            >
              {forecast.map((day, index) => (
                <Box
                  key={index}
                  sx={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    flexDirection: {
                      xs: "row",
                      md: "row",
                    },
                    gap: {
                      xs: 2,
                      md: 4,
                    },
                  }}
                >
                  <CloudIcon sx={{ fill: "yellowgreen" }} />
                  <Typography>
                    {new Date(day.dt_txt).toLocaleDateString()}
                  </Typography>
                  <Typography>Temp: {day.main.temp}°C</Typography>
                  <Typography>{day.weather[0].description}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
export default Content;

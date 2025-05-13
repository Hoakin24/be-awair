# 🌬️ Be AwAir

Be AwAir is a mobile app built with **React Native** that helps users check and understand **air quality** data across various locations in the Philippines.

It includes features like:

* Searching cities for real-time **Air Quality Index (AQI)**
* Viewing detailed pollutant data
* Interactive **map view** with markers and AQI popups
* Personalized location selection

---

## 🚀 Features

* 📍 **Map Tab**:
  Search for a location and view its AQI. Tap the marker for quick details and navigate to full reports.

* 📊 **Details Tab**:
  See AQI breakdowns for major cities or your searched places. Get helpful info about pollutants like PM2.5, CO, and NO₂.

---

## 🛠️ Tech Stack

* **React Native**
* **Expo**
* **react-native-maps**
* **OpenWeather Air Pollution API**
* **@rneui/themed** (UI components)

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/be-awair.git
   cd be-awair
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   npx expo start
   ```

---

## 🔑 API Key

You need an API key from **OpenWeather** to fetch air quality data.

1. Sign up at [https://openweathermap.org/](https://openweathermap.org/)
2. Get your API key.
3. Add it to your `fetchAirQuality` function in `/utils/api.ts`:

   ```ts
   const API_KEY = 'YOUR_API_KEY_HERE';
   ```

---

## 📂 Project Structure

```
/components
  └── location-search-bar/       // Reusable location search input
/screens
  ├── Map.tsx                    // Map view with marker and modal
  └── Details.tsx                // AQI breakdown list
/utils
  └── api.ts                     // Air quality + search API functions
```

---

## 📌 Notes

* Location search supports multiple results and fallback cities.
* Works best with internet connection for API fetching.

---

## 🙌 Contributions

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

MIT License.


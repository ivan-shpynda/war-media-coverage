import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import SearchBar from "./components/SearchBar";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { labels, countArticlesPerDay, countTermFrequency } from "./utils";
import rawdataNYT from "./data/combinedNYT.json";
import rawdataGuardian from "./data/combinedGuardian.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    const [dataNYT, setDataNYT] = useState(countArticlesPerDay(rawdataNYT));
    const [dataGuardian, setDataGuardian] = useState(
        countArticlesPerDay(rawdataGuardian)
    );

    const [hint, setHint] = useState("Total number of articles");

    const termTotalNumer = useMemo(() => {
        const nytTermTotalNumber = dataNYT.reduce((acc, curr) => acc + curr, 0);
        const guardianTermTotalNumber = dataGuardian.reduce(
            (acc, curr) => acc + curr,
            0
        );

        return { nyt: nytTermTotalNumber, guardian: guardianTermTotalNumber };
    }, [dataNYT, dataGuardian]);

    const handleSubmit = (term) => {
        if (term) {
            const termFrequencyNyt = countTermFrequency(rawdataNYT, term);
            const termFrequencyGuardian = countTermFrequency(
                rawdataGuardian,
                term
            );

            setDataNYT(termFrequencyNyt);
            setDataGuardian(termFrequencyGuardian);
            setHint(`Total number of article headlines containing "${term}"`);
        }
    };

    const handleReset = () => {
        setDataNYT(countArticlesPerDay(rawdataNYT));
        setDataGuardian(countArticlesPerDay(rawdataGuardian));
        setHint("Total number of articles");
    };

    const datasets = [
        {
            label: "The New York Times",
            backgroundColor: "#bf616a",
            borderColor: "#bf616a",
            borderWidth: 1,
            hoverBackgroundColor: "#bf616a",
            hoverBorderColor: "#bf616a",
            data: dataNYT,
        },
        {
            label: "The Guardian",
            backgroundColor: "#5e81ac",
            borderColor: "#5e81ac",
            borderWidth: 1,
            hoverBackgroundColor: "#5e81ac",
            hoverBorderColor: "#5e81ac",
            data: dataGuardian,
        },
    ];

    return (
        <div className="app">
            <h1>
                A Quantitative Look at Media Coverage of the Russo-Ukrainian War
            </h1>
            <SearchBar handleSubmit={handleSubmit} />
            <Line data={{ labels, datasets }} options={{ responsive: true }} />
            <div className="infoBlock">
                <p>
                    {hint}:
                    <span className="number nyt">{termTotalNumer.nyt}</span>
                    <span className="number guardian">
                        {termTotalNumer.guardian}
                    </span>
                </p>

                <button className="resetBtn" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <footer>
                <p className="footerContent">
                    &copy; {new Date().getFullYear()} by Ivan Shpynda
                </p>
            </footer>
        </div>
    );
}

export default App;

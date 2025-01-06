const generateDateLabels = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const labels = [];

    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        labels.push(new Date(date).toLocaleDateString("en-GB"));
    }

    return labels;
};

export const labels = generateDateLabels("2022-02-24", "2024-12-01");

function processLabel(label) {
    return label.replace(/\//g, "-").split("-").reverse().join("-");
}

export function countArticlesPerDay(data) {
    const articleCounts = labels.map((label) => {
        const adaptedLabel = processLabel(label);
        return data.all.filter((article) =>
            article.pub_date.startsWith(adaptedLabel)
        ).length;
    });

    return articleCounts;
}

export function countTermFrequency(data, name) {
    const nameCounts = labels.map((label) => {
        const adaptedLabel = processLabel(label);
        const termCount = data.all
            .filter((article) => article.pub_date.startsWith(adaptedLabel))
            .reduce((acc, article) => {
                const title = article.headline.toLowerCase();
                if (title.includes(name.toLowerCase())) {
                    return acc + 1;
                } else {
                    return acc;
                }
            }, 0);

        return termCount;
    });

    return nameCounts;
}

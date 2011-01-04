var sources = [
{code: "dfid", name: "DFID"},
{code: "worldbank", name: "World Bank"},
{code: "undp", name: "UNDP"},
]

function getSourceName(code) {
    for (source in sources) {
        if (sources[source].code == code) {
            return sources[source].name;
        }
    }
    return "undefined";
}


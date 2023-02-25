const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffa500",
    "#9400d3",
    "#ff1493",
    "#f0e68c",
    "#00ffff",
    "#ff00ff",
    "#4682b4",
    "#d2691e",
    "#6b8e23",
    "#a52a2a",
    "#dc143c",
    "#000080",
    "#008000",
    "#b22222",
    "#008080",
    "#dda0dd",
    "#800080",
    "#66cdaa",
    "#ba55d3",
    "#cd5c5c",
    "#ffc0cb",
    "#8b008b",
    "#191970",
    "#556b2f",
    "#9932cc",
    "#228b22",
];

function getColor(initials) {
    const hash = Array.from(initials).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
    );
    return colors[hash % colors.length];
}

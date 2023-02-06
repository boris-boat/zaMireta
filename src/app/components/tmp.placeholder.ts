const returnHr = (hr: number) => {
    if (hr < 10) return `0${hr}`;
    else return hr;
};
let minutes = [':00', ':15', ':30', ':45'];
let from = 12;
let to = 19;
let termini: string[] = [];
for (let i = from; i <= to - 1; i++) {
    for (let k = 0; k < minutes.length; k++) {
        termini.push(returnHr(i) + minutes[k]);
    }
}
export default termini 
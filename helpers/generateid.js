const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;

//date.now() get the time in miliseconds
//toString(32) get the number on base 32. using 32 simbols
//Math.random() random number between 0 and 1
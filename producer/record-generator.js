'use strict';

const recordGenerator = () => {
    return {
        getRandomRecord: () => {
            const firstNames = ['John', 'Bran', 'Arya', 'Sansa', 'Robb', 'Rickon'];
            const lastNames = ['Lannister', 'Stark', 'Tully', 'Martell'];

            const getRandomAge = () => Math.floor(Math.random() * 100);
            const getRandomFirstName = () => firstNames[Math.floor(Math.random() * firstNames.length)];
            const getRandomLastName = () => lastNames[Math.floor(Math.random() * lastNames.length)];

            const record = {
                firstName: getRandomFirstName(),
                lastName: getRandomLastName(),
                age: getRandomAge()
            };
            return record;
        }
    }
}

module.exports = recordGenerator;
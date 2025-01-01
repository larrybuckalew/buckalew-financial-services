// Utility function to group array of objects by a specific key
function groupBy(array, key) {
    return array.reduce((result, obj) => {
        const groupKey = obj[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(obj);
        return result;
    }, {});
}

// Example usage
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 25 }
];

const groupedByAge = groupBy(people, 'age');
console.log(groupedByAge);
// Output: 
// {
//   '25': [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 25 }],
//   '30': [{ name: 'Bob', age: 30 }]
// }